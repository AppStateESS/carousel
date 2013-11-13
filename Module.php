<?php

namespace carousel;

/**
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */
class Module extends \Module implements \SettingDefaults {

    public function __construct()
    {
        parent::__construct();
        $this->setTitle('carousel');
        $this->setProperName('Carousel for Bootstrap themes');
    }

    public function getController(\Request $request)
    {
        $cmd = $request->shiftCommand();
        if ($cmd == 'admin' && \Current_User::allow('carousel')) {
            $admin = new \carousel\Controller\Admin($this);
            return $admin;
        }
    }

    public function runTime(\Request $request)
    {
        if (!$request->isVar('module')) {
            \Layout::add($this->display(), 'carousel', 'slides');
        }
    }

    public function getSettingDefaults()
    {

    }

    private function getSlides()
    {
        $db = \Database::newDB();
        $t1 = $db->addTable('caro_slide');
        $t1->addOrderBy($t1->getField('queue'));
        $db->select();


        $tpl[1] = 'http://localhost/responsive/asu_responsive/img/carousel/Durham_pano-02.png';
        $tpl[2] = 'http://localhost/responsive/asu_responsive/img/carousel/Fall_Panorama1.png';
        $tpl[3] = 'http://localhost/responsive/asu_responsive/img/carousel/YosefPano1.png';
        return $tpl;

    }

    private function display()
    {
        $tpl['images'] = $this->getSlides();
        $template = new \Template($tpl);

        $template->setModuleTemplate('carousel', 'slides.html');
        return $template->get();
    }

}

?>
