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
use phpws2\Database;

class CarouselView extends AbstractView
{
    
    public function __construct()
    {
        $this->factory = new \carousel\Factory\CarouselFactory();
    }
    
    public function listing()
    {
        
    }
    
    public function view($carouselId) {
        
    }
    
    public function homeView() {
        $carousel = $this->factory->getHomeCarousel();
        if (empty($carousel)) {
            return 'no';
        }
    }
    
}
