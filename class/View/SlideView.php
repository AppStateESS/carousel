<?php

/**
 * MIT License
 * Copyright (c) 2019 Electronic Student Services @ Appalachian State University
 * 
 * See LICENSE file in root directory for copyright and distribution permissions.
 * 
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 * @license https://opensource.org/licenses/MIT
 */

namespace carousel\View;

use carousel\Resource\SlideResource;
use phpws2\Template;

class SlideView extends AbstractView
{

    public function view(SlideResource $slide, bool $active = false)
    {
        if ($slide->type) {
            return $this->mediaSlide($slide, $active);
        } else {
            return $this->imageSlide($slide, $active);
        }
    }

    public function imageSlide(SlideResource $slide, bool $active = false)
    {
        $vars = $slide->getStringVars();
        $vars['active'] = $active;
        
        switch ($slide->caption_zone) {
            case 0:
                $vars['vertical'] = 'bottom';
                $vars['horizontal'] = 'center';
                break;
            case 1:
                $vars['vertical'] = 'top';
                $vars['horizontal'] = 'left';
                break;
            case 2:
                $vars['horizontal'] = 'right';
                $vars['vertical'] = 'top';
                break;
            case 3:
                $vars['horizontal'] = 'left';
                $vars['vertical'] = 'bottom';
                break;
            case 4:
                $vars['horizontal'] = 'right';
                $vars['vertical'] = 'bottom';
                break;
        }
        if (!empty($slide->url) && !empty($slide->title)) {
            $vars['caption_title'] = '<a href="' . $slide->url . '">' . $slide->title . '</a>';
        } else {
            $vars['caption_title'] = $slide->title;
        }
        $template = new Template($vars);
        $template->setModuleTemplate('carousel', 'imageSlide.html');
        return $template->get();
    }

    public function mediaSlide(SlideResource $slide, bool $active = false)
    {
        $vars = $slide->getStringVars();
        $vars['active'] = $active;
        $template = new Template($vars);
        $template->setModuleTemplate('carousel', 'mediaSlide.html');
        return $template->get();
    }

}
