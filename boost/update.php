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
    } // end of switch

    return true;
}

?>