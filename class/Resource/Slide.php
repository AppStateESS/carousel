<?php

namespace carousel\Resource;

/**
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */
class Slide extends \Resource {

    protected $title;
    protected $filepath;
    protected $caption;
    protected $queue;

    protected $table = 'caro_slide';

    public function __construct()
    {
        parent::__construct();
        $this->title = new \Variable\TextOnly(null, 'title');
        $this->filepath = new \Variable\File(null, 'filepath');
        $this->caption = new \Variable\String(null, 'caption');
        $this->caption->allowEmpty(true);
        $this->caption->setInputType('textarea');
        $this->queue = new \Variable\Integer(0, 'queue');
        $this->active = new \Variable\Bool(0, 'active');
    }

    public function setTitle($title)
    {
        $this->title->set($title);
    }

    public function setFilepath($filepath)
    {
        $this->filepath->set($filepath);
    }

    public function setCaption($caption)
    {
        $caption = strip_tags($caption, '<p><a><strong><b><i><em><ul><li>');
        $this->caption->set($caption);
    }

    public function setQueue($queue)
    {
        $this->queue->set($queue);
    }

    public function setActive($active)
    {
        $this->active->set((bool)$active);
    }

    public function getTitle()
    {
        return $this->title->get();
    }
    
    public function getQueue()
    {
        return $this->queue->get();
    }

    public function getFilepath()
    {
        return $this->filepath->get();
    }

    public function getCaption()
    {
        return $this->filepath->get();
    }

    public function getActive()
    {
        return $this->active->get();
    }

    public function isActive()
    {
        return $this->getActive();
    }
}

?>
