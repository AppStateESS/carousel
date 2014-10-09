<?php

/**
 * @author Matthew McNaney <mcnaney at gmail dot com>
 * @version $Id$
 */
function carousel_update(&$content, $version)
{
    switch ($version) {
        case version_compare($version, '1.1.0', '<'):
            $db = \Database::newDB();
            $t1 = $db->addTable('caro_slide');
            if (!$t1->columnExists('url')) {
                $dt = $t1->addDataType('url', 'text');
                $dt->add();
            }

            $content[] = '<pre>1.1.0
--------------------
+ Slide is linkable.
</pre>';
        case version_compare($version, '1.2.0', '<'):
            $db = \Database::newDB();
            if (!$db->tableExists('caro_keyed_slide')) {
                $keyed_slide = $db->buildTable('caro_keyed_slide');
                $dt = $keyed_slide->addDataType('slide_id', 'int');
                $dt = $keyed_slide->addDataType('key_id', 'int');
                $keyed_slide->create();
            }
            $content[] = '<pre>1.2.0
--------------------
+ Can now associate a slide to a page.
+ Can control iterations of slides
</pre>';
        case version_compare($version, '1.3.0', '<'):
            $db = \Database::newDB();
            $tbl = $db->addTable('caro_slide');
            $dt = new \Database\Datatype\Integer($tbl, 'caption_zone');
            $dt->setDefault(0);
            $dt->add();
            $content[] = '<pre>1.3.0
--------------------
+ Slide location added
</pre>';
    } // end of switch

    return true;
}

?>