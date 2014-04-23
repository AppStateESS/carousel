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
        if (!$slide->isSaved()) {
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
        }

        \ResourceFactory::saveResource($slide);
    }

    public static function getSlides($active = null, $id = null)
    {
        $db = \Database::newDB();
        $t1 = $db->addTable('caro_slide');
        if (isset($active)) {
            $t1->addFieldConditional('active', (int) (bool) $active);
        }

        if ($id) {
            $t1->addFieldConditional('id', (int) $id);
        }
        $t1->addOrderBy($t1->getField('queue'));
        return $db->select();
    }

    public static function getById($id)
    {
        $slide = new Resource\Slide;
        if ($id) {
            \ResourceFactory::loadById($slide, $id);
            return $slide;
        } else {
            return $slide;
        }
    }

    public static function delete(Resource\Slide $slide)
    {
        self::deleteImages($slide);
        \ResourceFactory::deleteResource($slide);
        self::reorderSlides();
    }

    public static function reorderSlides()
    {
        $db = \Database::newDB();
        $t1 = $db->addTable('caro_slide');
        $t1->addField('id');
        $t1->addOrderBy($t1->getField('queue'));
        $count = 1;
        while ($id = $db->selectColumn()) {
            $db2 = \Database::newDB();
            $t2 = $db2->addTable('caro_slide');
            $t2->addValue('queue', $count);
            $t2->addFieldConditional('id', $id);
            $db2->update();
            $count++;
        }
    }

    public static function deleteImages(Resource\Slide $slide)
    {
        $file = $slide->getFilepath();
        if (is_file($file)) {
            unlink($file);
        }
        $thumb = self::thumbPath($file);
        if (is_file($thumb)) {
            unlink($thumb);
        }
    }

    private static function thumbPath($path)
    {
        return preg_replace('/\.(jpg|jpeg|gif|png)$/i', '_tn.\\1', $path);
    }

}

?>
