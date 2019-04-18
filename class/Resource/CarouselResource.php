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

namespace carousel\Resource;
use phpws2\Resource;
use carousel\Resource\AbstractResource;

class CarouselResource extends AbstractResource
{

    protected $id;
    protected $title;
    protected $iterations;
    protected $intervalTime;
    protected $indicator;
    protected $controls;
    protected $pause;
    protected $lockDimensions;
    protected $frontpage;
    
    protected $table = 'caro_carousel';

    public function __construct()
    {
        parent::__construct();
        $this->title = new \phpws2\Variable\StringVar('', 'title');
        $this->iterations = new \phpws2\Variable\IntegerVar(2, 'iterations');
        $this->iterations->setRange(0,3);
        $this->intervalTime = new \phpws2\Variable\IntegerVar(4, 'intervalTime');
        $this->intervalTime->setRange(1,10);
        $this->indicator = new \phpws2\Variable\IntegerVar(0, 'indicator');
        $this->indicator->setRange(0,3);
        $this->controls = new \phpws2\Variable\BooleanVar(true, 'controls');
        $this->pause = new \phpws2\Variable\BooleanVar(true, 'pause');
        $this->lockDimensions = new \phpws2\Variable\BooleanVar(true, 'lockDimensions');
        $this->frontpage = new \phpws2\Variable\BooleanVar(false, 'frontpage');
    }
    
}
