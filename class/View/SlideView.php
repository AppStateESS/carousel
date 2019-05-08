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

    private function getSlideVars(SlideResource $slide, bool $active = false)
    {
        $vars = $slide->getStringVars();
        $vars['active'] = $active;

        switch ($slide->caption_zone) {
            case 0:
                $vars['vertical'] = 'center';
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
            case 5:
                $vars['horizontal'] = 'center';
                $vars['vertical'] = 'top';
                break;
            case 6:
                $vars['horizontal'] = 'center';
                $vars['vertical'] = 'bottom';
                break;
        }

        if (!empty($slide->url)) {
            if (!empty($slide->title)) {
                $vars['caption_title'] = '<a href="' . $this->prepareUrl($slide->url) . '">' . $slide->title . '</a>';
            }
            if (!empty($slide->caption)) {
                $vars['caption'] = '<a href="' . $this->prepareUrl($slide->url) . '">' . $slide->caption . '</a>';
            }
        }

        return $vars;
    }

    private function prepareUrl(string $url)
    {
        if (preg_match('@^\./@', $url)) {
            $url = \Canopy\Server::getSiteUrl() . str_replace('./', '', $url);
        } else {
            $url = '//' . $this->removeUrlProtocol($url);
        }
        return $url;
    }

    /**
     * @returns string
     */
    private function removeUrlProtocol($url)
    {
        return preg_replace('@^https?:/\/@', '', $url);
    }

    public function imageSlide(SlideResource $slide, bool $active = false)
    {
        $vars = $this->getSlideVars($slide, $active);
        $vars['url'] = $this->prepareUrl($vars['url']);
        $template = new Template($vars);
        $template->setModuleTemplate('carousel', 'imageSlide.html');
        return $template->get();
    }

    public function mediaSlide(SlideResource $slide, bool $active = false)
    {
        $vars = $this->getSlideVars($slide, $active);
        $vars['url'] = $this->prepareUrl($vars['url']);
        $vars['videoType'] = preg_match('/\.mp4$/', $slide->filepath) ? 'video/mp4' : 'video/webm';
        $template = new Template($vars);
        $template->setModuleTemplate('carousel', 'mediaSlide.html');
        return $template->get();
    }

}
