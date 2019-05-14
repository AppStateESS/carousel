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

class SlideResource extends AbstractResource
{

    protected $carouselId;
    protected $title;
    protected $show_title;
    protected $filepath;
    protected $thumbnail;
    protected $caption;
    protected $queue;
    protected $url;

    /**
     * 0 = Center
     * 1 = Top left
     * 2 = Top right
     * 3 = Bottom left
     * 4 = Bottom right
     * 5 = Top center
     * 6 = Bottom center
     * @var integer
     */
    protected $caption_zone;
    protected $active;
    protected $width;
    protected $height;
    /**
     * 0 image
     * 1 video
     * @var phpws2\Variable\IntegerVar
     */
    protected $type;
    /**
     *
     * @var \phpws2\Variable\SmallInteger
     */
    protected $opacity;
    protected $table = 'caro_slide';

    public function __construct()
    {
        parent::__construct();
        $this->carouselId = new \phpws2\Variable\IntegerVar(0, 'carouselId');
        $this->title = new \phpws2\Variable\TextOnly(null, 'title');
        $this->show_title = new \phpws2\Variable\BooleanVar(1, 'show_title');
        $this->filepath = new \phpws2\Variable\FileVar(null, 'filepath');
        $this->filepath->allowNull(true);
        $this->thumbnail = new \phpws2\Variable\FileVar(null, 'thumbnail');
        $this->thumbnail->allowNull(true);
        $this->caption = new \phpws2\Variable\StringVar(null, 'caption');
        $this->caption->allowEmpty(true);
        $this->caption->setInputType('textarea');
        $this->queue = new \phpws2\Variable\IntegerVar(0, 'queue');
        $this->active = new \phpws2\Variable\BooleanVar(0, 'active');
        $this->url = new \phpws2\Variable\StringVar(null, 'url');
        $this->url->allowEmpty(1);
        $this->url->setInputType('textarea');
        $this->caption_zone = new \phpws2\Variable\SmallInteger(0, 'caption_zone');
        $this->width = new \phpws2\Variable\IntegerVar(0, 'width');
        $this->width->setRange(0, 20000);
        $this->height = new \phpws2\Variable\IntegerVar(0, 'height');
        $this->height->setRange(0, 20000);
        $this->type = new \phpws2\Variable\IntegerVar(0, 'type');
        $this->type->setRange(0,2);
        $this->opacity = new \phpws2\Variable\SmallInteger(50, 'opacity');
        $this->opacity->setRange(0, 100);
    }
}
