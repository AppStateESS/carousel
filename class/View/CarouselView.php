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

    private function viewSlides(CarouselResource $carousel, array $slides)
    {
        $active = true;
        $slideView = new SlideView;
        foreach ($slides as $slide) {
            $htmlSlides[] = $slideView->view($slide, $active);
            $active = false;
        }
        $vars = $carousel->getStringVars();
        $vars['slides'] = implode("\n", $htmlSlides);
        $template = new Template($vars);
        $template->setModuleTemplate('carousel', 'carousel.html');
        return $template->get();
    }

}
