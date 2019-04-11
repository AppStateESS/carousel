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

namespace carousel\Controller\Admin;

use Canopy\Request;
use carousel\Controller\SubController;
use carousel\Factory\SlideFactory as Factory;
use carousel\View\SlideView as View;

class Slide extends SubController
{

    /**
     * @var carousel\View\SlideView 
     */
    protected $view;

    /**
     * @var carousel\Factory\SlideFactory
     */
    protected $factory;

    protected function loadFactory()
    {
        $this->factory = new Factory;
    }

    protected function loadView()
    {
        $this->view = new View;
    }

    protected function listHtml(Request $request)
    {
        $carouselId = $request->pullGetInteger('carousel');
        return $this->view->scriptView('Slide', true,
                        ['carouselId' => $carouselId]);
    }

    protected function listJson(Request $request)
    {
        $listing = $this->factory->listing();
        return ['listing' => $listing];
    }

    protected function uploadPost(Request $request)
    {
        $carouselId = $request->pullPostInteger('carouselId');
        $this->factory->upload($carouselId);
        return ['success' => true];
    }

}
