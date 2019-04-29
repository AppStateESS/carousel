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
use carousel\Resource\CarouselResource as Resource;
use carousel\Factory\SlideFactory;

class CarouselFactory extends BaseFactory
{

    public function build()
    {
        $resource = new Resource;
        return $resource;
    }

    public function post(Request $request)
    {
        $carousel = $this->build();
        $carousel->title = $request->pullPostString('title');
        $carousel->iterations = $request->pullPostInteger('iterations');
        $carousel->transition = $request->pullPostInteger('transition');
        $carousel->intervalTime = $request->pullPostInteger('intervalTime');
        $carousel->indicator = $request->pullPostInteger('indicator');
        $carousel->controls = $request->pullPostBoolean('controls');
        $carousel->pause = $request->pullPostBoolean('pause');
        return $carousel;
    }

    public function listing(array $options = [])
    {
        $db = Database::getDB();
        $tbl = $db->addTable('caro_carousel');
        if (!empty($options['titleOnly'])) {
            $tbl->addField('id');
            $tbl->addField('title');
        }

        if (!empty($options['notPinned'])) {
            $tbl->addFieldConditional('id', $options['notPinned'], '!=');
        }
        $tbl->addOrderBy('title');
        $result = $db->select();
        return $result;
    }

    public function put(int $id, Request $request)
    {
        $carousel = $this->load($id);
        $carousel->title = $request->pullPutString('title');
        $carousel->iterations = $request->pullPutInteger('iterations');
        $carousel->transition = $request->pullPutInteger('transition');
        $carousel->intervalTime = $request->pullPutInteger('intervalTime');
        $carousel->indicator = $request->pullPutInteger('indicator');
        $carousel->controls = $request->pullPutBoolean('controls');
        $carousel->pause = $request->pullPutBoolean('pause');
        return $carousel;
    }

    public function delete(Resource $carousel)
    {
        $slideFactory = new SlideFactory;
        $slideFactory->deleteByCarouselId($carousel->id);
        self::deleteResource($carousel);
    }

    public function getHomeCarousel()
    {
        $db = Database::getDB();
        $tbl = $db->addTable('caro_carousel');
        $tbl->addFieldConditional('frontpage', 1);
        $db->setLimit(1);
        $carousel = $db->selectAsResources('\carousel\Resource\CarouselResource');
        if (empty($carousel)) {
            return;
        }
        return $carousel[0];
    }

    /**
     * Toggles the selected carousel to front page status
     * @param int $carouselId
     */
    public function toggleFrontPage(int $carouselId)
    {
        $carousel = $this->load($carouselId);
        if ($carousel->frontpage) {
            $carousel->frontpage = false;
            self::saveResource($carousel);
        } else {
            $this->removeFrontPage();
            $carousel->frontpage = true;
            self::saveResource($carousel);
        }
    }

    /**
     * Removes front page status from ALL carousels.
     */
    private function removeFrontPage()
    {
        $db = Database::getDB();
        $tbl = $db->addTable('caro_carousel');
        $tbl->addValue('frontpage', 0);
        $db->update();
    }

    public function unpin(int $carouselId, int $keyId)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('caro_pin');
        $tbl->addFieldConditional('carouselId', $carouselId);
        $tbl->addFieldConditional('keyId', $keyId);
        $db->delete();
    }

    public function pin(int $carouselId, int $keyId)
    {
        $this->unpin($carouselId, $keyId);
        $db = Database::getDB();
        $tbl = $db->addTable('caro_pin');
        $tbl->addValue('carouselId', $carouselId);
        $tbl->addValue('keyId', $keyId);
        $db->insert();
    }

    public function getPinned($keyId)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('caro_pin');
        $tbl->addField('carouselId');
        $tbl->addFieldConditional('keyId', $keyId);
        $result = $db->selectColumn();
        if (empty($result)) {
            return;
        }
        $carousel = $this->load($result);
        return $carousel;
    }

}
