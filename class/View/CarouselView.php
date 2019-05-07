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

use carousel\Factory\SlideFactory;
use carousel\View\SlideView;
use carousel\Resource\CarouselResource;
use carousel\Resource\SlideResource;
use phpws2\Database;
use phpws2\Template;

class CarouselView extends AbstractView
{

    public function __construct()
    {
        $this->factory = new \carousel\Factory\CarouselFactory();
    }

    public function view(CarouselResource $carousel)
    {
        $slideFactory = new SlideFactory;
        $slides = $slideFactory->listing(['carouselId' => $carousel->id, 'asResource' => true, 'activeOnly' => true]);
        if (empty($slides)) {
            return null;
        }
        $options['intervalTime'] = $carousel->intervalTime * 1000;
        $options['iterations'] = $carousel->iterations * count($slides);
        $this->scriptView('View', false, $options, true);
        \Layout::addStyle('carousel');
        return $this->viewSlides($carousel, $slides);
    }

    public function homeView()
    {
        $carousel = $this->factory->getHomeCarousel();
        if (empty($carousel)) {
            return;
        }
        return $this->view($carousel);
    }

    private function getIndicator(int $indicator, SlideResource $slide,
            int $key, bool $active)
    {
        if ($indicator == 0) {
            return;
        }
        $className = $active ? 'active' : null;
        if ($indicator == 1 || $slide->type == 1) {
            return <<<EOF
<li data-target="#carousel-slides" data-slide-to="$key" class="$className"></li>
EOF;
        } else {
            $thumbnail = $slide->thumbnail;
            $filepath = $slide->filepath;
            return <<<EOF
<li data-target="#carousel-slides" data-slide-to="$key" class="$className">
<img src="$filepath" /></li>
EOF;
        }
    }

    private function viewSlides(CarouselResource $carousel, array $slides)
    {
        $indicators = [];
        $active = true;
        $slideView = new SlideView;
        foreach ($slides as $key => $slide) {
            $htmlSlides[] = $slideView->view($slide, $active);
            if ($carousel->indicator) {
                $indicators[] = $this->getIndicator($carousel->indicator,
                        $slide, $key, $active);
            }
            $active = false;
        }
        $vars = $carousel->getStringVars();
        // no controls if only one slide.
        if (count($slides) === 1) {
            $vars['controls'] = 0;
        }
        $vars['bullets'] = $vars['thumbnails'] = null;

        if (!empty($indicators)) {
            if ($carousel->indicator == 1) {
                $vars['bullets'] = '<ol class="carousel-indicators bullet">' . implode('',
                                $indicators) . '</ol>';
            } else {
                $vars['thumbnails'] = '<ol class="carousel-indicators thumbnail">' . implode('',
                                $indicators) . '</ol>';
            }
        }
        $vars['fade'] = $carousel->transition == 1 ? ' carousel-fade' : null;
        $vars['thumbnail'] = $carousel->indicator == 2 ? 'carousel-thumbnails' : null;
        $vars['slideCount'] = count($slides);
        $vars['slides'] = implode("\n", $htmlSlides);
        $template = new Template($vars);
        $template->setModuleTemplate('carousel', 'carousel.html');
        return $template->get();
    }

    public function miniAdmin(int $keyId)
    {
        $this->scriptView('MiniAdmin', false, ['keyId' => $keyId], true);

        $options['titleOnly'] = true;
        $pinnedCarousel = $this->factory->getPinned($keyId);
        if ($pinnedCarousel) {
            $options['notPinned'] = $pinnedCarousel->id;
            $vars['unpinId'] = $pinnedCarousel->id;
        } else {
            $carousels = $this->factory->listing($options);
            $vars['carousels'] = $carousels;
        }
        $template = new Template($vars);
        $template->setModuleTemplate('carousel', 'miniAdmin.html');
        return $template->get();
    }

    public function viewPinned(int $keyId)
    {
        $carousel = $this->factory->getPinned($keyId);
        if (empty($carousel)) {
            return;
        }

        return $this->view($carousel);
    }

}
