<?php

namespace carousel;

/**
 * This class is left in to facilitate interaction with Menu and Pagesmith
 * @deprecated
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */
use carousel\Factory\CarouselFactory;
use carousel\Factory\SlideFactory as NewSlideFactory;

class SlideFactory
{
    public static function getSlidesFromDB(bool $active = null, int $id = null)
    {
        $carouselFactory = new CarouselFactory();
        $newSlideFactory = new NewSlideFactory();
        $carousel = $carouselFactory->getHomeCarousel();
        if (empty($carousel)) {
            return null;
        }

        $options['carouselId'] = $carousel->id;

        if (!empty($active)) {
            $options['activeOnly'] = true;
        }

        if ($id) {
            $slide = $newSlideFactory->load($id);
            if (!$slide) {
                return;
            }
            return [$slide->getStringVars()];
        } else {
            $slides = $newSlideFactory->listing($options);
            return $slides;
        }
    }
}

?>