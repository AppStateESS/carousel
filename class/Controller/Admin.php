<?php

namespace carousel\Controller;

/**
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */
class Admin extends \Http\Controller
{
    private $slide;

    public function get(\Canopy\Request $request)
    {
        $data = array();
        $view = $this->getView($data, $request);
        $response = new \Canopy\Response($view);
        return $response;
    }

    public function getHtmlView($data, \Canopy\Request $request)
    {
        $cmd = $request->shiftCommand();
        if (empty($cmd)) {
            $cmd = 'slides';
        }
        $this->loadMenu($cmd);
        switch ($cmd) {
            case 'slides':
                $template = $this->listSlides($request);
                break;
            case 'settings':
                $template = $this->settings($request);
                break;
        }
        $template->add('menu', $this->menu->get());



        if (!empty(\Session::getInstance()->caro_message)) {
            $ses = \Session::getInstance();
            $template->add('message', $ses->caro_message);
            unset($ses->caro_message);
        }

        $panel = $template->get();
        $view = new \View\HtmlView(\PHPWS_ControlPanel::display($panel));
        return $view;
    }

    protected function getJsonView($data, \Canopy\Request $request)
    {
        if ($request->isVar('command')) {
            switch ($request->getVar('command')) {
                case 'list_groups':
                    $data = $this->listGroupsJSON();
                    break;

                case 'list_slides':
                    $data = $this->listSlidesJSON();
                    break;

                case 'edit_slide':
                    $data = $this->editSlide($request);
                    break;

                case 'delete_slide':
                    $data = $this->deleteSlide($request);
                    break;

                case 'deactivate':
                    $data = $this->deactivate($request);
                    break;

                case 'activate':
                    $data = $this->activate($request);
                    break;

                case 'move_slide':
                    $data = $this->moveSlide($request);
                    break;

                case 'addSlideToPage':
                    $data = $this->addSlideToPage($request);
                    break;

                case 'removeSlideFromPage':
                    $data = $this->removeSlideFromPage($request);
                    break;
            }
        } else {
            throw new \Exception('JSON command not found');
        }
        return parent::getJsonView($data, $request);
    }

    private function removeSlideFromPage(\Canopy\Request $request)
    {
        if ($request->isVar('key_id')) {
            $key_id = $request->getVar('key_id');
            $this->dropSlide($key_id);
            $data['success'] = 1;
        } else {
            $data['success'] = 0;
        }
        return $data;
    }

    private function addSlideToPage(\Canopy\Request $request)
    {
        if ($request->isVar('slide_id') && $request->isVar('key_id')) {
            $key_id = $request->getVar('key_id');
            $slide_id = $request->getVar('slide_id');
            $this->dropSlide($key_id);
            $this->pushSlide($key_id, $slide_id);
            $data['success'] = 1;
        } else {
            $data['success'] = 0;
        }
        return $data;
    }

    private function dropSlide($key_id)
    {
        $db = \phpws2\Database::newDB();
        $t = $db->addTable('caro_keyed_slide');
        $t->addFieldConditional('key_id', $key_id);
        $db->delete();
    }

    private function pushSlide($key_id, $slide_id)
    {
        $db = \phpws2\Database::newDB();
        $t = $db->addTable('caro_keyed_slide');
        $t->addValue('key_id', $key_id);
        $t->addValue('slide_id', $slide_id);
        $db->insert();
    }

    private function moveSlide(\Canopy\Request $request)
    {
        $move_id = $request->getVar('move_id');
        $next_id = $request->getVar('next_id');

        $move_slide = \carousel\SlideFactory::getById($move_id);
        $move_slide_queue = $move_slide->getQueue();

        if ($next_id) {
            $next_slide = \carousel\SlideFactory::getById($next_id);
            $next_slide_queue = $next_slide->getQueue();
        } else {
            $next_slide = null;
            $next_slide_queue = null;
        }

        $db = \phpws2\Database::newDB();
        if ($next_slide) {
            if ($move_slide_queue > $next_slide_queue) {
                $query = "UPDATE caro_slide SET caro_slide.queue=caro_slide.queue+1 WHERE (caro_slide.queue >= $next_slide_queue AND caro_slide.queue < $move_slide_queue)";
                $db->exec($query);
                $move_slide->setQueue($next_slide_queue);
            } else {
                $query = "UPDATE caro_slide SET caro_slide.queue=caro_slide.queue-1 WHERE (caro_slide.queue < $next_slide_queue AND caro_slide.queue > $move_slide_queue)";
                $db->exec($query);
                $move_slide->setQueue($next_slide_queue - 1);
            }
        } else {
            $t1 = $db->addTable('caro_slide');
            $t1->addField('id', 'count')->showCount();
            $result = $db->selectOneRow();
            $count = $result['count'];

            $db = \phpws2\Database::newDB();
            $query = "UPDATE caro_slide SET caro_slide.queue=caro_slide.queue-1 WHERE (caro_slide.queue <= $count AND caro_slide.queue > $move_slide_queue)";
            $db->exec($query);
            $move_slide->setQueue($count);
        }
        \carousel\SlideFactory::save($move_slide);
    }

    private function deactivate(\Canopy\Request $request)
    {
        $this->loadSlide($request);
        $this->slide->setActive(false);
        \carousel\SlideFactory::save($this->slide);
    }

    private function activate(\Canopy\Request $request)
    {
        $this->loadSlide($request);
        $this->slide->setActive(true);
        \carousel\SlideFactory::save($this->slide);
    }

    private function deleteSlide(\Canopy\Request $request)
    {
        $this->loadSlide($request);
        \carousel\SlideFactory::delete($this->slide);
    }

    private function editSlide(\Canopy\Request $request)
    {
        $this->loadSlide($request);
        $vars = $this->slide->getStringVars();
        return $vars;
    }

    private function listSlidesJSON()
    {
        $db = \phpws2\Database::newDB();
        $sg = $db->addTable('caro_slide');
        $sg->addOrderBy($sg->getField('queue'));
        $sg_title = $sg->getField('title');
        $sg_queue = $sg->getField('queue');
        $pager = new \phpws2\DatabasePager($db);
        $pager->setHeaders(array('title', 'queue'));
        $tbl_headers['title'] = $sg_title;
        $tbl_headers['queue'] = $sg_queue;
        $pager->setTableHeaders($tbl_headers);
        $pager->setId('slide-list');
        $pager->setRowIdColumn('id');
        $pager->setCallback(array('\carousel\Controller\Admin', 'pagerRow'));
        return $pager->getJson();
    }

    private function settings()
    {
        $form = new \Form;
        $form->setAction('carousel/admin/settings');
        $form->addHidden('command', 'save_settings');
        $iteration = array(0 => 'Forever', 1 => 1, 2 => 2, 3 => 3, 4 => 4, 5 => 5, 10 => 10);
        $form->addSelect('iteration', $iteration, 'Iterations')->setSelection(\phpws2\Settings::get('carousel', 'iteration'));
        $interval = array(1 => 1, 2 => 2, 3 => 3, 4 => 4, 5 => 5, 6 => 6, 7 => 7, 8 => 8, 9 => 9, 10 => 10, 15 => 15, 20 => 20);
        $form->addSelect('time_interval', $interval, 'Slide time interval')->setSelection(\phpws2\Settings::get('carousel', 'time_interval'));
        $slide = $form->addRadio('transition', 0, 'Slide');
        $fade = $form->addRadio('transition', 1, 'Fade');


        switch (\phpws2\Settings::get('carousel', 'transition')) {
            case 0:
                $slide->setSelection(1);
                break;

            case 1:
                $fade->setSelection(1);
                break;
        }

        $bullet = $form->addRadio('indicator', 0, 'Bullets');
        $thumbnail = $form->addRadio('indicator', 1, 'Thumbnails');
        switch (\phpws2\Settings::get('carousel', 'indicator')) {
            case 0:
                $bullet->setSelection(1);
                break;

            case 1:
                $thumbnail->setSelection(1);
                break;
        }

        $form->addSubmit('save', 'Save settings');
        $form->appendCSS('bootstrap');

        $tpl = $form->getInputStringArray();

        if (isset($_SESSION['carousel_message'])) {
            $tpl['message'] = $_SESSION['carousel_message'];
            unset($_SESSION['carousel_message']);
        }

        $template = new \phpws2\Template($tpl);
        $template->setModuleTemplate('carousel', 'Admin/Settings.html');
        return $template;
    }

    public static function pagerRow($row)
    {
        extract($row);
        $thumbnail = preg_replace('/(.*)\.(png|jpeg|jpg)$/i', '\\1_tn.\\2', $filepath);
        $row['filepath'] = "<img src='$thumbnail' style='width:200px' />";
        $checked = $row['active'] ? 'checked="checked"' : null;
        $row['active-slide'] = "<input type='checkbox' value='1' $checked data-slide-id='$id' class='active-checkbox' />";
        return $row;
    }

    private function listSlides(\Canopy\Request $request)
    {
        javascript('jquery_ui');
        javascript('ckeditor');
        \Pager::prepare();
        \Layout::includeJavascript('mod/carousel/javascript/slide_list.min.js');
        \Layout::addStyle('carousel', 'Admin/style.css');

        $slide = new \carousel\Resource\Slide;
        $form = $slide->pullForm();
        $form->setEnctype(\Form::enctype_multipart);
        $form->appendCSS('bootstrap');
        $form->requiredScript();
        $form->addHidden('command', 'save_slide');
        $form->setId('slide-form');
        $form->getSingleInput('id')->setName('slide_id');
        $form->getSingleInput('title')->setRequired(true);
        $form->getSingleInput('filepath')->setLabel('Image');
        $caption_zone[0] = 'Center';
        $caption_zone[1] = 'Top left';
        $caption_zone[2] = 'Top right';
        $caption_zone[3] = 'Bottom left';
        $caption_zone[4] = 'Bottom right';

        $caption_zone = $form->addSelect('caption_zone', $caption_zone);
        $form->removeInput('caption_zone');
        $form->plugInput($caption_zone);

        $form->addSubmit('submit', 'Save slide');
        $tpl = $form->getInputStringArray();
        $tpl['min_width'] = \Settings::get('carousel', 'min_width');
        $tpl['min_height'] = \Settings::get('carousel', 'min_height');
        $template = new \phpws2\Template($tpl);
        $template->setModuleTemplate('carousel', 'Admin/SlideForm.html');
        
        $modal = new \Modal('slide-update', $template->render(), 'Create new slide');
        $modal->sizeLarge();
        $modal->addButton('<button class="btn btn-success save-slide">Save slide</button>');

        $pager_template = new \phpws2\Template(array('modal' => $modal->__toString()));
        $pager_template->setModuleTemplate('carousel', 'Admin/ListSlides.html');

        return $pager_template;
    }

    public function post(\Canopy\Request $request)
    {
        if (!$request->isVar('command')) {
            throw new \phpws2\Http\MethodNotAllowedException;
        }
        switch ($request->getVar('command')) {
            case 'save_slide':
                $this->saveSlide($request);
                break;

            case 'save_settings':
                $this->saveSettings($request);
                $_SESSION['carousel_message'] = 'Settings saved';
                break;
        }
        $response = new \Http\SeeOtherResponse(\Canopy\Server::getCurrentUrl(false));
        return $response;
    }

    private function saveSettings(\Canopy\Request $request)
    {
        \Settings::set('carousel', 'iteration', $request->getVar('iteration'));
        \Settings::set('carousel', 'time_interval', $request->getVar('time_interval'));
        \Settings::set('carousel', 'transition', $request->getVar('transition'));
        \Settings::set('carousel', 'indicator', $request->getVar('indicator'));
    }

    private function saveSlide(\Canopy\Request $request)
    {
        $this->loadSlide($request);

        if ($request->isUploadedFile('filepath')) {
            \carousel\SlideFactory::deleteImages($this->slide);

            $file = $request->getUploadedFileArray('filepath');
            $file_name = \Canopy\TextString::randomString(12) . '.' . str_replace('image/', '', $file['type']);

            \PHPWS_File::fileCopy($file['tmp_name'], 'images/carousel/', $file_name, false, true);
            \PHPWS_File::makeThumbnail($file_name, 'images/carousel/', 'images/carousel/', 200);
            $this->slide->setFilepath('images/carousel/' . $file_name);
        } elseif (!$this->slide->getId()) {
            throw new \Exception('No image uploaded for new slide.');
        }

        if (!$this->slide->isSaved()) {
            $this->slide->setActive(true);
        }
        $this->slide->setTitle($request->getVar('title'));
        $this->slide->setCaption($request->getVar('caption'));
        $this->slide->setUrl($request->getVar('url'));
        $this->slide->setCaptionZone($request->getVar('caption_zone'));
        if ($request->isVar('show_title')) {
            $this->slide->setShowTitle(1);
        } else {
            $this->slide->setShowTitle(0);
        }
        \carousel\SlideFactory::save($this->slide);
    }

    private function loadSlide(\Canopy\Request $request)
    {
        if ($request->isVar('slide_id')) {
            $id = $request->getVar('slide_id');
            $this->slide = \carousel\SlideFactory::getById($id);
        } else {
            $this->slide = new \carousel\Resource\Slide;
        }
    }

    private function loadMenu($active)
    {
        $this->menu = new \carousel\Menu($active);
    }

}

?>
