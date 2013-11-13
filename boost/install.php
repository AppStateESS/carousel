<?php

/**
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 * @package Global
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */

function carousel_install(&$content)
{
    $db = Database::newDB();
    $db->begin();

    try {
        $slide = new \carousel\Resource\Slide;
        $st = $slide->createTable($db);
        $slide = new \carousel\Resource\SlideGroup;
        $sg = $slide->createTable($db);
    } catch (\Exception $e) {
        if (isset($st) && $db->tableExists($st->getName())) {
            $st->drop();
        }
        if (isset($sg) && $db->tableExists($sg->getName())) {
            $sg->drop();
        }
        $db->rollback();
        throw $e;
    }
    $db->commit();

    $content[] = 'Tables created';
    return true;
}
?>
