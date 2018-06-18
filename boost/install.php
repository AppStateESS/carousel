<?php

/**
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
function carousel_install(&$content)
{
    $db = \phpws2\Database::newDB();
    $db->begin();

    try {
        $slide = new \carousel\Resource\Slide;
        $st = $slide->createTable($db);
        $keyed_slide = $db->buildTable('caro_keyed_slide');
        $dt = $keyed_slide->addDataType('slide_id', 'int');
        $dt = $keyed_slide->addDataType('key_id', 'int');
        $keyed_slide->create();
    } catch (\Exception $e) {
        if (isset($st) && $db->tableExists($st->getName())) {
            $st->drop();
        }
        $db->rollback();
        throw $e;
    }
    $db->commit();

    $content[] = 'Tables created';
    return true;
}
