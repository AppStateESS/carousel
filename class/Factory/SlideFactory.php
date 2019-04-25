<?php

/**
 * MIT License
 * Copyright (c) 2019 Electronic Student Services @ Appalachian State University
 * 
 * See LICENSE file in root directory for copyright and distribution permissions.
 * 
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 * @license https://opensource.org/licenses/MIT
 */

namespace carousel\Factory;

use Canopy\Request;
use phpws2\Database;
use carousel\Resource\SlideResource;
use carousel\UploadHandler;

define('CAROUSEL_MEDIA_DIRECTORY', './images/carousel/');

class SlideFactory extends BaseFactory
{

    public function build()
    {
        $resource = new SlideResource;
        return $resource;
    }

    public function deleteByCarouselId(int $carouselId)
    {
        if (empty($carouselId)) {
            throw new \Exception('Carousel id is empty');
        }

        $db = Database::getDB();
        $tbl = $db->addTable('caro_slide');
        $tbl->addFieldConditional('carouselId', $carouselId);
        $db->delete();
    }

    public function listing(array $options = [])
    {
        $db = Database::getDB();
        $tbl = $db->addTable('caro_slide');
        $tbl->addOrderBy('queue');
        if (!empty($options['carouselId'])) {
            $tbl->addFieldConditional('carouselId', $options['carouselId']);
        }
        if (!empty($options['activeOnly'])) {
            $tbl->addFieldConditional('active', 1);
        }

        if (!empty($options['asResource'])) {
            $result = $db->selectAsResources('\\carousel\\Resource\\SlideResource');
        } else {
            $result = $db->select();
        }
        return $result;
    }

    public function delete(SlideResource $slide)
    {
        try {
            unlink($slide->filepath);
            unlink($slide->thumbnail);
            $this->deleteResource($slide);
            $this->requeue($slide);
        } catch (\Exception $e) {
            return $this->deleteResource($slide);
        }
    }

    public function requeue(SlideResource $slide)
    {
        $sortable = new \phpws2\Sortable('caro_slide', 'queue');
        $sortable->setAnchor('carouselId', $slide->carouselId);
        $sortable->reorder();
    }

    public function patch($slideId, $varname, $value)
    {
        $slide = $this->load($slideId);
        $slide->$varname = $value;
        return $slide;
    }

    /**
     * Sets post variables within Slide object
     * @param Request $request
     * @return carousel\Resource\SlideResource
     */
    public function post(Request $request)
    {
        $slide = $this->build();

        $slide->carouselId = $request->pullPostInteger('carouselId');
        $slide->title = $request->pullPostString('title');
        $slide->show_title = $request->pullPostBoolean('show_title');
        $slide->caption = $request->pullPostString('caption');
        $slide->url = $request->pullPostString('url');
        $slide->caption_zone = $request->pullPostInteger('caption_zone');
        $slide->active = $request->pullPostBoolean('active');
        $slide->queue = $this->lastSlide($slide->carouselId) + 1;

        return $slide;
    }

    public function lastSlide(int $carouselId)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('caro_slide');
        $tbl->addField('queue');
        $tbl->addOrderBy('queue', 'desc');
        $db->setLimit(1);
        return $db->selectColumn();
    }

    public function postMedia($slide)
    {
        $result = $this->upload($slide->carouselId);

        $slide->filepath = $result['filepath'];
        $slide->thumbnail = $result['thumbnail'];
        $slide->type = $result['type'];
        $dim = getimagesize($slide->filepath);
        $slide->width = $dim[0];
        $slide->height = $dim[1];
        return $slide;
    }

    public function put($slideId, Request $request)
    {
        $slide = $this->load($slideId);

        $slide->title = $request->pullPutString('title');
        $slide->show_title = $request->pullPutBoolean('show_title');
        $slide->caption = $request->pullPutString('caption');
        $slide->url = $request->pullPutString('url');
        $slide->caption_zone = $request->pullPutInteger('caption_zone');
        $slide->active = $request->pullPutBoolean('active');

        return $slide;
    }

    /**
     * 
     * @staticvar array $imageTypes
     * @staticvar array $videoTypes
     * @param type $carouselId
     * @return array
     * @throws \Exception
     */
    public function upload(int $carouselId)
    {
        if (empty($carouselId)) {
            throw new \Exception('Missing carousel id');
        }
        static $imageTypes = array('image/jpeg', 'image/png', 'image/gif');
        static $videoTypes = array('video/webm', 'video/mp4');
        if (!isset($_FILES) || !isset($_FILES['file'])) {
            throw new \Exception('Upload missing image/media file.');
        }
        $file = $_FILES['file'];

        if (in_array($file['type'], $imageTypes)) {
            $result = $this->saveImage($file, $carouselId);
            $result['type'] = 0;
        } elseif (in_array($file['type'], $videoTypes)) {
            $result = $this->saveMedia($file, $carouselId);
            $result['type'] = 1;
        } else {
            throw carousel\Exception\WrongFileType;
        }
        return $result;
    }

    private function saveImage(array $file, int $carouselId)
    {
        $filepath = $this->moveImage($file, $carouselId);
        $dirStack = explode('/', $filepath);
        $filename = array_pop($dirStack);
        $path = implode('/', $dirStack) . '/';
        $thumbnail = $this->createThumbnail($path, $filename);
        return ['filepath' => $filepath, 'thumbnail' => $thumbnail];
    }

    /**
     * Creates a thumbnail based on object variables.
     */
    public function createThumbnail($sourceDirectory, $filename)
    {
        $source = $sourceDirectory . $filename;
        if (!is_file($source)) {
            return false;
        }
        list($width, $height) = getimagesize($source);
        $maxWidth = $width <= CAROUSEL_SYSTEM_SETTINGS['maxThumbWidth'] ? $width : CAROUSEL_SYSTEM_SETTINGS['maxThumbWidth'];
        $maxHeight = $height <= CAROUSEL_SYSTEM_SETTINGS['maxThumbHeight'] ? $height : CAROUSEL_SYSTEM_SETTINGS['maxThumbHeight'];

        $options = array('image_library' => true, 'upload_dir' => $sourceDirectory);
        $upload = new UploadHandler($options, false);

        $scaledOptions = array(
            'max_width' => $maxWidth,
            'max_height' => $maxHeight,
            'crop' => true,
            'jpeg_quality' => 100
        );

        $upload->create_scaled_image($filename, 'thumbnail', $scaledOptions);
        return $sourceDirectory . 'thumbnail/' . $filename;
    }

    private function saveMedia(array $file, SlideResource $slide)
    {
        
    }

    private function getImageOptions($pic, $imageDirectory, int $carouselId)
    {
        $imageDirectory = CAROUSEL_MEDIA_DIRECTORY . $carouselId . '/';
        $imagePath = PHPWS_HOME_DIR . $imageDirectory;
        $options = array(
            'max_width' => CAROUSEL_SYSTEM_SETTINGS['maxWidth'],
            'max_height' => CAROUSEL_SYSTEM_SETTINGS['maxHeight'],
            'current_image_extensions' => true,
            'param_name' => 'file',
            'upload_dir' => $imagePath,
            'upload_url' => \Canopy\Server::getSiteUrl(true) . $imageDirectory,
            'image_versions' => array()
        );
        return $options;
    }

    public function moveImage($pic, int $carouselId)
    {
        if ($pic['error'] !== 0) {
            throw new \Exception('Upload error');
        }
        $destination = CAROUSEL_MEDIA_DIRECTORY . $carouselId . '/';
        $options = $this->getImageOptions($pic, $destination, $carouselId);
        $upload_handler = new UploadHandler($options, false);
        $result = $upload_handler->post(false);
        return $destination . $result['file'][0]->name;
    }

    public function resort(int $slideId, int $newPositionId)
    {
        $slide = $this->load($slideId);
        $sortTo = $this->load($newPositionId);
        $sortable = new \phpws2\Sortable('caro_slide', 'queue');
        $sortable->setAnchor('carouselId', $slide->carouselId);
        $sortable->moveTo($slideId, $sortTo->queue);
    }

}
