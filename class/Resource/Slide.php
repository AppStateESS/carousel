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

    protected $table = 'caro_slide';

    public function __construct()
    {
        parent::__construct();
        $this->title = new \Variable\TextOnly(null, 'title');
        $this->filepath = new \Variable\File(null, 'filepath');
        $this->caption = new \Variable\String(null, 'caption');
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
        $this->caption->set($caption);
    }

}

?>
