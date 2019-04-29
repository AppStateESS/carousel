<?php

/**
 * Uninstall file for blog
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
function carousel_uninstall(&$content)
{
    $db = \phpws2\Database::newDB();

    if ($db->tableExists('caro_slide')) {
        $tbl = $db->buildTable('caro_slide');
        $tbl->drop();
    }
    if ($db->tableExists('caro_carousel')) {
        $tbl = $db->buildTable('caro_carousel');
        $tbl->drop();
    }
    if ($db->tableExists('caro_pin')) {
        $tbl = $db->buildTable('caro_pin');
        $tbl->drop();
    }
    return true;
}

?>
