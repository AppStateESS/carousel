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
        $db = \Database::newDB();
        $t1 = $db->addTable('caro_slide');
        $q = $t1->addField('queue');
        $ex = $db->getExpression("max($q)", 'max');
        $db->addExpression($ex);
        $max = $db->selectOneRow();
        if (!$max) {
            $slide->setQueue(0);
        } else {
            $slide->setQueue($max['max'] + 1);
        }

        \ResourceFactory::saveResource($slide);
    }

}

?>
