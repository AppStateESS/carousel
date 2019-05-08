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
use carousel\Factory\CarouselFactory as Factory;
use carousel\View\CarouselView as View;

class Carousel extends SubController
{

    /**
     * @var carousel\View\CarouselView 
     */
    protected $view;

    /**
     * @var carousel\Factory\CarouselFactory
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
        return $this->view->scriptView('Carousel');
    }

    protected function listJson(Request $request)
    {
        $search = $request->pullGetString('search', true);
        return ['listing' => $this->factory->listing(['search'=>$search])];
    }

    protected function post(Request $request)
    {
        $carousel = $this->factory->post($request);
        $this->factory->save($carousel);
        return ['success' => true];
    }

    protected function put(Request $request)
    {
        $carousel = $this->factory->put($this->id, $request);
        $this->factory->save($carousel);
        return ['success' => true];
    }
    
    protected function delete(Request $request)
    {
        $carousel = $this->factory->load($this->id);
        $this->factory->delete($carousel);
        return ['success' => true];
    }
    
    protected function frontpagePatch(Request $request)
    {
        $this->factory->toggleFrontPage($this->id);
        return ['success'=>true, 'id'=>$this->id];
    }
    
    protected function pinPut(Request $request)
    {
        $keyId = $request->pullPutInteger('keyId');
        $this->factory->pin($this->id, $keyId);
        return ['success'=>true];
    }
    
    protected function unpinPut(Request $request)
    {
        $keyId = $request->pullPutInteger('keyId');
        $this->factory->unpin($this->id, $keyId);
        return ['success'=>true];
    }

}
