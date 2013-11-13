<?php

namespace carousel\Resource;

/**
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */
class SlideGroup extends \Resource {

    protected $title;

    protected $begin_display;

    protected $end_display;

    protected $table = 'caro_slidegroup';

    public function __construct()
    {
        parent::__construct();
        $this->title = new \Variable\TextOnly(null, 'title');
        $this->begin_display = new \Variable\Datetime(null, 'begin_display');
        $this->end_display = new \Variable\Datetime(null, 'end_display');
    }

}

?>
