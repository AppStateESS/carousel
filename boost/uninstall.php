<?php

/**
 * Uninstall file for blog
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 * @version $Id$
 */
function carousel_uninstall(&$content)
{
    $db = Database::newDB();

    if ($db->tableExists('caro_slide')) {
        $tbl = $db->buildTable('caro_slide');
        $tbl->drop();
    }
    if ($db->tableExists('caro_slidegroup')) {
        $tbl = $db->buildTable('caro_slidegroup');
        $tbl->drop();
    }
    return true;
}

?>
