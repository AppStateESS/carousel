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
        $tbl2 = $db->buildTable('caro_keyed_slide');
        $tbl2->drop();
    }
    return true;
}

?>
