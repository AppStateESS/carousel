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
        \Layout::hideDefault();
        $carouselId = $request->pullGetInteger('carouselId');
        $carouselFactory = new \carousel\Factory\CarouselFactory;
        $carousel = $carouselFactory->load($carouselId);
        return $this->view->scriptView('Slide',
                        ['carouselId' => $carouselId, 'carouselTitle' => $carousel->title]);
    }

    protected function listJson(Request $request)
    {
        $carouselId = $request->pullGetInteger('carouselId');
        $search = $request->pullGetString('search', true);
        $sort = $request->pullGetString('sortBy', true);
        $sortDir = $request->pullGetString('sortByDir', true);
        $listing = $this->factory->listing(['carouselId' => $carouselId, 'search' => $search, 'sort' => $sort, 'sortDir' => $sortDir]);
        return ['listing' => $listing];
    }

    protected function mediaPost(Request $request)
    {
        try {
            $slide = $this->factory->load($request->pullPostInteger('slideId'));
            $this->factory->postMedia($slide, $request);
            $this->factory->save($slide);
            return ['success' => true];
        } catch (\Exception $e) {
            if (isset($slide) && empty($slide->filepath)) {
                $this->factory->delete($slide);
            }
            throw $e;
        }
    }

    protected function post(Request $request)
    {
        $slide = $this->factory->post($request);
        $this->factory->save($slide);
        return ['success' => true, 'slideId' => $slide->id];
    }

    protected function put(Request $request)
    {
        $slide = $this->factory->put($this->id, $request);
        $this->factory->save($slide);
        return ['success' => true, 'slideId' => $slide->id];
    }

    protected function activePatch(Request $request)
    {
        $slide = $this->factory->patch($this->id, 'active',
                $request->pullPatchBoolean('active'));
        $this->factory->save($slide);
        return ['success' => true];
    }

    protected function delete(Request $request)
    {
        $slide = $this->factory->load($this->id);
        $this->factory->delete($slide);
    }

    protected function sortPatch(Request $request)
    {
        $this->factory->resort($this->id, $request->pullPatchInteger('position'));
        return ['success' => true];
    }

}
