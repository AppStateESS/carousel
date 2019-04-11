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

namespace carousel\Controller;

use Canopy\Request;

class AjaxLoginError extends \phpws2\Http\Controller
{

    public function get(Request $request)
    {
        $json = ['success'=>false, 'message'=>'login expired'];
        $view = new \phpws2\View\JsonView($json);
        $response = new \Canopy\Response($view);
        return $response;
    }

}
