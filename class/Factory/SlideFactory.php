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
use carousel\Resource\SlideResource as Resource;

class SlideFactory extends BaseFactory
{

    public function build()
    {
        $resource = new Resource;
        return $resource;
    }

    public function deleteByCarouselId(int $carouselId)
    {
        if (empty($carouselId)) {
            throw new \Exception('Carousel id is empty');
        }

        $db = Database::getDB();
        $tbl = $db->addTable('caro_slide');
        $tbl->addFieldConditional('carouselId');
        $db->delete();
    }

    public function listing(array $options = [])
    {
        $db = Database::getDB();
        $tbl = $db->addTable('caro_slide');
        $tbl->addOrderBy('queue');
        $result = $db->select();
        return $result;
    }

    public function delete(Resource $slide)
    {
        
    }
    
    public function upload($carouselId)
    {
        var_dump($_FILES);exit;
        static $imageTypes = array('image/jpeg', 'image/png', 'image/gif');
        static $videoTypes = array('video/webm', 'video/mp4');
        if (!isset($_FILES) || empty($_FILES)) {
            return array('error' => 'No files uploaded');
        }
        $file = $_FILES['file'];
        var_dump($file);exit;

        try {
            if (!in_array($pic['type'], $imageTypes)) {
                throw new \properties\Exception\WrongImageType;
            }
            $this->resize($pic['tmp_name']);
            $title = $this->createTitleFromFileName($pic['tmp_name']);
            $size = getimagesize($pic['tmp_name']);
            $photo->width = $size[0];
            $photo->height = $size[1];
            $photo->title = $title;
            $photo->path = $this->moveImage($pic, $owner_id);
            $this->makeThumbnail($photo);
            $photo->porder = $this->getMaxOrder($photo->{$this->item_column}) + 1;
            self::saveResource($photo);
            $result['photo'] = $photo->getStringVars();
            $result['photo']['thumbnail'] = $photo->getThumbnail();
            $result['success'] = true;
        } catch (properties\Exception\FileSaveFailure $e) {
            $result['success'] = false;
            $result['error'] = $e->getMessage();
        } catch (properties\Exception\WrongImageType $e) {
            $result['success'] = false;
            $result['error'] = $e->getMessage();
        } catch (\Exception $e) {
            $result['success'] = false;
            $result['error'] = $e->getMessage();
        }
        return $result;
    }

}
