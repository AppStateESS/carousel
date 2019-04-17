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
        $tbl->addOrderBy('title');
        $result = $db->select();
        return $result;
    }

    public function put(int $id, Request $request)
    {
        $carousel = $this->load($id);
        $carousel->title = $request->pullPutString('title');
        $carousel->iterations = $request->pullPutInteger('iterations');
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
        $db = Database::getDB();
        $tbl = $db->addTable('caro_carousel');
        $tbl->addFieldConditional($carousel->id);
        $db->setLimit(1);
        $db->delete();
    }
}
