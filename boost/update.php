<?php

/**
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
function carousel_update(&$content, $version)
{
    switch ($version) {
        case version_compare($version, '1.4.0', '<'):
            $content[] = 'Versions prior to 1.4.0 must be updated in phpWebSite';
            return false;

        case version_compare($version, '1.5.0', '<'):
            $content[] = '<pre>1.5.0
--------------------
+ Updated for Canopy
</pre>';
        case version_compare($version, '1.5.1', '<'):
            $content[] = '<pre>1.5.1
--------------------
+ Fixed keyed Carousel images not showing.
</pre>';
        case version_compare($version, '2.0.0', '<'):
            $db = \phpws2\Database::getDB();
            $tbl = $db->addTable('controlpanel_link');
            $tbl->addValue('url', 'carousel/Admin/List');
            $tbl->addFieldConditional('itemname', 'carousel');
            $db->update();
            $content[] = '<pre>2.0.0
--------------------
+ Rewrite
</pre>';
            $db->clearConditional();
            $db->clearTables();
            $carousel = new \carousel\Resource\CarouselResource;
            $carousel->createTable($db);
    } // end of switch

    return true;
}

?>