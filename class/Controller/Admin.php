<?php

namespace carousel\Controller;

/**
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */
class Admin extends \Http\Controller {

    private $slide;

    public function get(\Request $request)
    {
        $data = array();
        $view = $this->getView($data, $request);
        $response = new \Response($view);
        return $response;
    }

    public function getHtmlView($data, \Request $request)
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
        return $template;
    }

    protected function getJsonView($data, \Request $request)
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

    private function removeSlideFromPage(\Request $request)
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

    private function addSlideToPage(\Request $request)
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
        $db = \Database::newDB();
        $t = $db->addTable('caro_keyed_slide');
        $t->addFieldConditional('key_id', $key_id);
        $db->delete();
    }

    private function pushSlide($key_id, $slide_id)
    {
        $db = \Database::newDB();
        $t = $db->addTable('caro_keyed_slide');
        $t->addValue('key_id', $key_id);
        $t->addValue('slide_id', $slide_id);
        $db->insert();
    }

    private function moveSlide(\Request $request)
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


        $db = \Database::newDB();
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

            $db = \Database::newDB();
            $query = "UPDATE caro_slide SET caro_slide.queue=caro_slide.queue-1 WHERE (caro_slide.queue <= $count AND caro_slide.queue > $move_slide_queue)";
            $db->exec($query);
            $move_slide->setQueue($count);
        }
        \carousel\SlideFactory::save($move_slide);
    }

    private function deactivate(\Request $request)
    {
        $this->loadSlide($request);
        $this->slide->setActive(false);
        \carousel\SlideFactory::save($this->slide);
    }

    private function activate(\Request $request)
    {
        $this->loadSlide($request);
        $this->slide->setActive(true);
        \carousel\SlideFactory::save($this->slide);
    }

    private function deleteSlide(\Request $request)
    {
        $this->loadSlide($request);
        \carousel\SlideFactory::delete($this->slide);
    }

    private function editSlide(\Request $request)
    {
        $this->loadSlide($request);
        $vars = $this->slide->getStringVars();
        return $vars;
    }

    private function listSlidesJSON()
    {
        $db = \Database::newDB();
        $sg = $db->addTable('caro_slide');
        $sg->addOrderBy($sg->getField('queue'));
        $sg_title = $sg->getField('title');
        $sg_queue = $sg->getField('queue');
        $pager = new \DatabasePager($db);
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
        $tpl = array();
        $template = new \Template($tpl);
        $template->setModuleTemplate('carousel', 'Admin/Settings.html');
        return $template;
    }

    public static function pagerRow($row)
    {
        extract($row);
        $thumbnail = preg_replace('/(.*)\.(png|jpeg|jpg)$/i', '\\1_tn.\\2',
                $filepath);
        $row['filepath'] = "<img src='$thumbnail' style='width:200px' />";
        $checked = $row['active'] ? 'checked="checked"' : null;
        $row['active-slide'] = "<input type='checkbox' value='1' $checked data-slide-id='$id' class='active-checkbox' />";
        return $row;
    }

    private function listSlides(\Request $request)
    {
        javascript('jquery_ui');
        \Pager::prepare();
        \Layout::addJSHeader("<script type='text/javascript' src='" .
                PHPWS_SOURCE_HTTP . "mod/carousel/javascript/slide_list.js'></script>");

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
        $form->addSubmit('submit', 'Save slide');
        $tpl = $form->getInputStringArray();
        $tpl['min_width'] = \Settings::get('carousel', 'min_width');
        $tpl['min_height'] = \Settings::get('carousel', 'min_height');
        $template = new \Template($tpl);
        $template->setModuleTemplate('carousel', 'Admin/ListSlides.html');
        return $template;
    }

    public function post(\Request $request)
    {
        if (!$request->isVar('command')) {
            throw new Http\MethodNotAllowedException;
        }
        switch ($request->getVar('command')) {
            case 'save_slide':
                $this->saveSlide($request);
                break;
        }
        $response = new \Http\SeeOtherResponse(\Server::getCurrentUrl(false));
        return $response;
    }

    private function saveSlide(\Request $request)
    {
        $this->loadSlide($request);

        if ($request->isUploadedFile('filepath')) {
            \carousel\SlideFactory::deleteImages($this->slide);

            $file = $request->getUploadedFileArray('filepath');
            $file_name = randomString(12) . '.' . str_replace('image/', '',
                            $file['type']);

            \PHPWS_File::fileCopy($file['tmp_name'], 'images/carousel/',
                    $file_name, false, true);
            \PHPWS_File::makeThumbnail($file_name, 'images/carousel/',
                    'images/carousel/', 200);
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

        \carousel\SlideFactory::save($this->slide);
    }

    private function loadSlide(\Request $request)
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
