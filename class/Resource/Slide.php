<?php

namespace carousel\Resource;

/**
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */
class Slide extends \phpws2\Resource {

    protected $title;
    protected $show_title;
    protected $filepath;
    protected $caption;
    protected $queue;
    protected $url;
    /**
     * 0 = Center
     * 1 = Top left
     * 2 = Top right
     * 3 = Bottom left
     * 4 = Bottom right
     * @var integer
     */
    protected $caption_zone;
    protected $active;

    protected $table = 'caro_slide';

    public function __construct()
    {
        parent::__construct();
        $this->title = new \phpws2\Variable\TextOnly(null, 'title');
        $this->show_title = new \phpws2\Variable\BooleanVar(1, 'show_title');
        $this->filepath = new \phpws2\Variable\File(null, 'filepath');
        $this->caption = new \phpws2\Variable\StringVar(null, 'caption');
        $this->caption->allowEmpty(true);
        $this->caption->setInputType('textarea');
        $this->queue = new \phpws2\Variable\IntegerVar(0, 'queue');
        $this->active = new \phpws2\Variable\BooleanVar(0, 'active');
        $this->url = new \phpws2\Variable\StringVar(null, 'url');
        $this->url->allowEmpty(1);
        $this->url->setInputType('textarea');
        $this->caption_zone = new \phpws2\Variable\IntegerVar(0, 'caption_zone');
    }

    public function setTitle($title)
    {
        $this->title->set($title);
    }
    
    public function setShowTitle($show_title)
    {
        $this->show_title->set($show_title);
    }

    public function setFilepath($filepath)
    {
        $this->filepath->set($filepath);
    }

    public function setCaption($caption)
    {
        if (!\Current_User::isDeity()) {
            $caption = strip_tags($caption, '<p><em><strong><b><i><em><ul><li>');
        }
        $this->caption->set($caption);
    }

    public function setUrl($url)
    {
        $this->url->set($url);
    }

    public function setCaptionZone($zone)
    {
        $this->caption_zone->set($zone);
    }

    public function getUrl()
    {
        return $this->url->get();
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
    
    public function getShowTitle()
    {
        return $this->show_title->get();
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
