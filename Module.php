<?php

/**
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */

namespace carousel;

use Canopy\Request;
use Canopy\Response;
use Canopy\Server;
use Canopy\SettingDefaults;
use carousel\View\CarouselView;
use carousel\Factory\CarouselFactory;
use carousel\Controller\Controller;

if (is_file(PHPWS_SOURCE_DIR . 'mod/carousel/config/defines.php')) {
    require_once PHPWS_SOURCE_DIR . 'mod/carousel/config/defines.php';
} else {
    require_once PHPWS_SOURCE_DIR . 'mod/carousel/config/defines.dist.php';
}

class Module extends \Canopy\Module
{

    public function __construct()
    {
        parent::__construct();
        $this->setTitle('carousel');
        $this->setProperName('Carousel for Bootstrap themes');
        spl_autoload_register('\carousel\Module::autoloader', true, true);
    }

    public static function autoloader($class_name)
    {
        static $not_found = array();

        if (strpos($class_name, 'carousel') !== 0) {
            return;
        }

        if (isset($not_found[$class_name])) {
            return;
        }
        $class_array = explode('\\', $class_name);
        array_shift($class_array);
        $class_dir = implode('/', $class_array);

        $class_path = PHPWS_SOURCE_DIR . 'mod/carousel/class/' . $class_dir . '.php';
        if (is_file($class_path)) {
            require_once $class_path;
            return true;
        } else {
            $not_found[] = $class_name;
            return false;
        }
    }

    public function getController(Request $request)
    {
        try {
            $controller = new Controller($this, $request);
            return $controller;
        } catch (\conference\Exception\PrivilegeMissing $e) {
            if ($request->isGet() && !$request->isAjax()) {
                \Current_User::requireLogin();
            } else {
                throw $e;
            }
        }
    }

    public function runTime(Request $request)
    {
        if (version_compare($this->version, '2.0.0', '<')) {
            return;
        }
        if (!$request->isVar('module')) {
            $view = new CarouselView;
            $factory = new CarouselFactory;
            $carousel = $factory->getHomeCarousel();
            if (!empty($carousel)) {
                $homeView = $view->view($carousel);
                \Layout::add($homeView, 'carousel', 'slides');
                if (\Current_User::allow('carousel')) {
                    \MiniAdmin::add('carousel',
                            '<a href="./carousel/Admin/Slide/?carouselId=' . $carousel->id . '">Edit current slides</a>');
                }
            }
        }
    }

    public function afterRun(Request $request, \Canopy\Response $response)
    {
        if (version_compare($this->version, '2.0.0', '<')) {
            return;
        }
        $key = \Canopy\Key::getCurrent();
        if ($key && !$key->isDummy() && !$key->isHomeKey()) {
            if (\Current_User::allow('carousel')) {
                $this->pinForm($key->id);
            }
            $this->viewPinned($key->id);
        }
    }

    private function viewPinned($keyId)
    {
        $carouselView = new View\CarouselView;
        \Layout::add($carouselView->viewPinned($keyId), 'carousel', 'slides');
    }

    private function pinForm($keyId)
    {
        $carouselView = new View\CarouselView;
        $content = $carouselView->miniAdmin($keyId);
        \MiniAdmin::add('carousel', $content);
    }

}

?>
