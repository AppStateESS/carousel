<?php

namespace carousel;

/**
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */
class SlideFactory {

    public static function save(Resource\Slide $slide)
    {
        \ResourceFactory::saveResource($slide);
    }

    public static function loadById($id)
    {
        $slide = new Resource\Slide;
        if ($id) {
            \ResourceFactory::loadById($slide, $id);
            return $slide;
        } else {
            return $slide;
        }
    }

    public static function delete(Resource\Slide $slide)
    {
        self::deleteImages($slide);
        \ResourceFactory::deleteResource($slide);
    }

    public static function deleteImages(Resource\Slide $slide)
    {
        $file = $slide->getFilepath();
        if (is_file($file)) {
            unlink($file);
        }
        $thumb = self::thumbPath($file);
        if (is_file($thumb)) {
            unlink($thumb);
        }
    }

    private static function thumbPath($path)
    {
        return preg_replace('/\.(jpg|jpeg|gif|png)$/i', '_tn.\\1', $path);
    }

}

?>
