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
class Version2
{

    private $previousSettings;

    public function __construct()
    {
        $this->loadPreviousSettings();
    }

    public function runUpdate()
    {
        $this->updateControlpanel();
        $this->createCarouselTable();
        $this->createThumbnailDirectory();
        $this->createPinTable();
        $this->updateSlideTable();
        $carouselId = $this->createFirstCarousel();
        $this->updateSlides($carouselId);
    }

    private function createPinTable()
    {
        $db = \phpws2\Database::getDB();
        $caroPin = $db->buildTable('caro_pin');
        $ci = $caroPin->addDataType('carouselId', 'int');
        $ki = $caroPin->addDataType('keyId', 'int');
        $caroPin->create();
        $unique = new \phpws2\Database\Unique([$ci, $ki]);
        $unique->add();
    }

    private function updateControlpanel()
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('controlpanel_link');
        $tbl->addValue('url', 'carousel/Admin/Carousel');
        $tbl->addFieldConditional('itemname', 'carousel');
        $db->update();
    }

    private function createCarouselTable()
    {
        $db = \phpws2\Database::getDB();
        $carousel = new \carousel\Resource\CarouselResource();
        $carousel->createTable($db);
    }

    private function loadPreviousSettings()
    {
        $db = \phpws2\Database::getDB();
        $settings = $db->addTable('settings');
        $settings->addFieldConditional('module_name', 'carousel');
        $result = $db->select();
        if (empty($result)) {
            return;
        }
        foreach ($result as $set) {
            $this->previousSettings[$set['variable_name']] = $set['setting'];
        }
    }

    private function createFirstCarousel()
    {
        $factory = new \carousel\Factory\CarouselFactory;
        $carousel = $factory->build();
        $carousel->title = 'First Carousel';
        $carousel->iterations = $this->previousSettings['iteration'];
        if ($carousel->iterations > 3) {
            $carousel->iterations = 3;
        }
        $carousel->intervalTime = $this->previousSettings['time_interval'];
        if ($carousel->intervalTime % 2) {
            $carousel->intervalTime = $carousel->intervalTime + 1;
        }
        $carousel->transition = $this->previousSettings['transition'];
        $carousel->indicator = $this->previousSettings['indicator'];
        $carousel->frontpage = true;
        $factory->save($carousel);
        return $carousel->id;
    }

    private function createThumbnailDirectory()
    {
        $imgDirectory = PHPWS_HOME_DIR . 'images/carousel/thumbnail/';
        if (!is_dir($imgDirectory)) {
            mkdir($imgDirectory);
        }
    }

    private function updateSlideTable()
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('caro_slide');
        $width = new \phpws2\Database\Datatype\Smallint($tbl, 'width');
        $width->add();
        $height = new \phpws2\Database\Datatype\Smallint($tbl, 'height');
        $height->add();
        $type = new \phpws2\Database\Datatype\Smallint($tbl, 'type');
        $type->add();
        $carouselId = new \phpws2\Database\Datatype\Integer($tbl, 'carouselId');
        $carouselId->setDefault(0);
        $carouselId->add();
        $thumbnail = new \phpws2\Database\Datatype\Varchar($tbl, 'thumbnail');
        $thumbnail->setSize(255);
        $thumbnail->add();
        $opacity = new \phpws2\Database\Datatype\Smallint($tbl, 'opacity');
        $opacity->setDefault(50);
        $opacity->add();
    }

    private function moveThumbnail($slide)
    {
        $filepath = $slide->filepath;
        $oldThumbnailPath = preg_replace('/\.(png|jpeg)$/', '_tn.\\1', $filepath);
        $pathArray = explode('/', $oldThumbnailPath);
        $thumbnailFile = array_pop($pathArray);
        $newPath = PHPWS_HOME_DIR . 'images/carousel/thumbnail/' . $thumbnailFile;
        copy($oldThumbnailPath, $newPath);
        unlink($oldThumbnailPath);
        return 'images/carousel/thumbnail/' . $thumbnailFile;
    }

    private function updateSlides($carouselId)
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('caro_slide');
        $slides = $db->selectAsResources('\\carousel\\Resource\\SlideResource');

        foreach ($slides as $slide) {
            $dim = getimagesize($slide->filepath);
            $slide->width = $dim[0];
            $slide->height = $dim[1];
            $slide->type = 0;
            $slide->carouselId = $carouselId;
            $newPath = $this->moveThumbnail($slide);
            $slide->thumbnail = $newPath;
            \carousel\Factory\SlideFactory::saveResource($slide);
        }
    }

}