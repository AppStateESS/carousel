<?php

/**
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
require_once PHPWS_SOURCE_DIR . 'mod/carousel/boost/Version2.php';

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
            $version2 = new Version2;
            $version2->runUpdate();

            $content[] = '<pre>2.0.0
--------------------
+ Rewrite of Carousel
+ Multiple Carousels
+ Ability to use videos
+ Pinning of Carousels to pages.
</pre>';

        case version_compare($version, '2.0.1', '<'):
            $content[] = '<pre>2.0.1
--------------------
+ Fixed relative urls.
+ Fixed url links on captions.
+ Fixed text orientation on captioning.
</pre>';
    } // end of switch

    return true;
}

?>