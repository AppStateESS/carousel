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

        $class_path = PHPWS_SOURCE_DIR . 'mod/conference/class/' . $class_dir . '.php';
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
        if (!$request->isVar('module')) {
            $view = new CarouselView;
            \Layout::add($view->homeView(), 'carousel', 'slides');
        }
    }

    public function afterRun(Request $request, \Canopy\Response $response)
    {
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

    /*
      public function runTime(\Canopy\Request $request)
      {
      if (!$request->isVar('module')) {
      $display = \carousel\SlideFactory::display();
      if (!empty($display)) {
      \Layout::add($display, 'carousel', 'slides');
      }
      }
      }

      public function afterRun(\Canopy\Request $request,
      \Canopy\Response $response)
      {
      $key = \Canopy\Key::getCurrent();
      if ($key && !$key->isDummy()) {
      $this->checkKey($key->id);
      }
      }

      private function checkKey($key_id)
      {
      \Layout::addJSHeader('<script type="text/javascript" src="' . PHPWS_SOURCE_HTTP
      . 'mod/carousel/javascript/add_slide.js"></script>');
      $db = \phpws2\Database::newDB();
      $t = $db->addTable('caro_keyed_slide');
      $t->addField('slide_id');
      $t->addFieldConditional('key_id', $key_id);
      $result = $db->selectColumn();
      if (\Current_User::allow('carousel')) {
      $this->miniAdmin($result, $key_id);
      }
      if (!empty($result)) {
      \carousel\SlideFactory::showKeySlide($result);
      }
      }

      private function miniAdmin($result, $key_id)
      {
      if (empty($result)) {
      $db = \phpws2\Database::newDB();
      $t2 = $db->addTable('caro_slide');
      $t2->addOrderBy('title');
      $t2->addField('title');
      $t2->addField('id');
      $slides = $db->select();
      if (empty($slides)) {
      return;
      }

      $opt[] = '<option id="0" style="">' . 'Add slide to this page' . '</option>';
      foreach ($slides as $s) {
      $opt[] = '<option value="' . $s['id'] . '">' . substr($s['title'],
      0, 15) . '</option>';
      }

      $select = '<select data-key-id="' . $key_id . '" id="add-slide" style="font-size:12px" class="form-control">'
      . implode("\n", $opt) . '</select>';
      } else {
      $select = '<a href="javascript:void(0)" id="remove-slide" data-key-id="' . $key_id . '">' . 'Remove slide from page' . '</a>';
      }
      \MiniAdmin::add('carousel', $select);
      }
     *
     */
}

?>
