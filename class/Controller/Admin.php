<?php

namespace carousel\Controller;

/**
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */
class Admin extends \Http\Controller {

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
            $cmd = 'groups';
        }
        $this->loadMenu($cmd);

        switch ($cmd) {
            case 'groups':
                $template = $this->listGroups($request);
                break;

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
            }
        } else {
            throw new \Exception('JSON command not found');
        }
        return parent::getJsonView($data, $request);
    }

    private function listGroupsJSON()
    {
        $db = \Database::newDB();
        $sg = $db->addTable('caro_slidegroup');
        $sg_title = $sg->addField('title');
        $sg_begin = $sg->addField('begin_display');
        $sg_end = $sg->addField('end_display');
        $pager = new \DatabasePager($db);
        $pager->setHeaders(array('title', 'begin_display', 'end_display'));
        $tbl_headers['title'] = $sg_title;
        $tbl_headers['begin_display'] = $sg_begin;
        $tbl_headers['end_display'] = $sg_end;
        $pager->setTableHeaders($tbl_headers);
        $pager->setId('group-list');
        $pager->setRowIdColumn('id');
        return $pager->getJson();
    }

    private function listSlidesJSON()
    {
        $db = \Database::newDB();
        $sg = $db->addTable('caro_slide');
        $sg_title = $sg->getField('title');
        $pager = new \DatabasePager($db);
        $pager->setHeaders(array('title'));
        $tbl_headers['title'] = $sg_title;
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
        $row['filepath'] = "<img src='$filepath' style='width:200px' />";
        return $row;
    }

    private function listGroups(\Request $request)
    {
        \Pager::prepare();

        $tpl = array();
        $template = new \Template($tpl);
        $template->setModuleTemplate('carousel', 'Admin/ListGroups.html');
        return $template;
    }

    private function listSlides(\Request $request)
    {
        javascript('jquery_ui');
        \Pager::prepare();
        \Layout::addJSHeader("<script type='text/javascript' src='" .
                PHPWS_SOURCE_HTTP . "mod/carousel/javascript/slide_list.js'></script>");

        $slide = new \carousel\Resource\Slide;
        $form = $slide->pullForm();
        $form->appendCSS('bootstrap');
        $form->requiredScript();
        $form->setId('slide-form');
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

    }

    private function saveSlide()
    {
        $slide = new Resource\Slide;
        $slide->setTitle('Durham park');
        $slide->setFilepath('images/carousel/Durham_pano-02.png');
        $slide->setCaption('This is Durham Park');

        SlideFactory::save($slide);
    }

    private function loadMenu($active)
    {
        $this->menu = new \carousel\Menu($active);
    }

}

?>
