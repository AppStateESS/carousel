<?php

namespace carousel;

/**
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */
class Menu {

    private $active;

    public function __construct($active)
    {
        $this->active = $active;
    }

    public function get()
    {
        $template = new \phpws2\Template;
        switch ($this->active) {
            case 'slides':
                $template->add('slides_active', 1);
                break;
            case 'settings':
                $template->add('settings_active', 1);
                break;
        }
        $template->setModuleTemplate('carousel', 'Admin/Menu.html');
        return $template->get();
    }

    public function __toString()
    {
        return $this->get();
    }
}

?>
