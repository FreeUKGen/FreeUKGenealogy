<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(
  '*' => array(
    'tablePrefix' => 'craft'
  ),
  '.dev' => array(
    'server' => '127.0.0.1',
    'user' => 'root',
    'password' => 'mekormbk',
    'database' => 'freeukgenealogy'
  ),
  '.net' => array(
    'server' => '127.0.0.1',
    'user' => 'deploy',
    'password' => 'QvM7c7TAOPx29fVrvc5w6JgG',
    'database' => 'freeukgenealogy'
  ),
  '.co.uk' => array(
    'server' => '127.0.0.1',
    'user' => 'deploy',
    'password' => 'QvM7c7TAOPx29fVrvc5w6JgG',
    'database' => 'freeukgenealogy'
  )
);
