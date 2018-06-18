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
        $tbl2 = $db->buildTable('caro_keyed_slide');
        $tbl2->drop();
    }
    return true;
}

?>
