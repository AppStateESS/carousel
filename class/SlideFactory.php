<?php

namespace carousel;

/**
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */
class SlideFactory {

    public static function save(Resource\Slide $slide)
    {
        \ResourceFactory::saveResource($slide);
    }

}

?>
