<?php

/**
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
function carousel_install(&$content)
{
    $db = \phpws2\Database::newDB();
    $db->begin();

    try {
        $slide = new \carousel\Resource\SlideResource;
        $st = $slide->createTable($db);
        
        $carousel = new \carousel\Resource\CarouselResource;
        $ct = $carousel->createTable($db);
        
        $caroPin = $db->buildTable('caro_pin');
        $ci = $caroPin->addDataType('carouselId', 'int');
        $ki = $caroPin->addDataType('keyId', 'int');
        $caroPin->create();
        $unique = new \phpws2\Database\Unique([$ci, $ki]);
        $unique->add();
    } catch (\Exception $e) {
        if (isset($st) && $db->tableExists($st->getName())) {
            $st->drop();
        }
        if (isset($ct) && $db->tableExists($ct->getName())) {
            $ct->drop();
        }
        if (isset($caroPin) && $db->tableExists($caroPin->getName())) {
            $caroPin->drop();
        }
        $db->rollback();
        throw $e;
    }
    $db->commit();

    $content[] = 'Tables created';
    return true;
}
