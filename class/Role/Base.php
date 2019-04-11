<?php

/**
 * MIT License
 * Copyright (c) 2017 Electronic Student Services @ Appalachian State University
 * 
 * See LICENSE file in root directory for copyright and distribution permissions.
 * 
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 * @license https://opensource.org/licenses/MIT
 */

namespace carousel\Role;

abstract class Base
{

    /**
     * Id of user role. Anonymous users will have id = 0
     * @var integer
     */
    protected $id;

    public function __construct($id = null)
    {
        $this->id = (int) $id;
    }

    public function isAdmin()
    {
        return false;
    }

    public function isUser()
    {
        return false;
    }
    
    public function getId()
    {
        return $this->id;
    }
    
    public function getType()
    {
        switch (1) {
            case $this->isAdmin():
                return 'admin';
                
            case $this->isUser():
                return 'user';
        }
    }

}
