<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

// set the url to be dynamic
$protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://';
$base_url = $protocol . $_SERVER['HTTP_HOST'] . '/';
define('CRAFT_SITE_URL', $base_url);

// set some defaults

return array(
  '*' => array(
    'addTrailingSlashesToUrls' => true,
    'defaultImageQuality' => 100,
    'omitScriptNameInUrls' => true,
    'usePathInfo' => true,
    'pageTrigger' => 'page-',
    'backupDbOnUpdate' => true,
    'restoreDbOnUpdateFailure' => true
  ),
  '.net' => array( 'devMode' => true ),
  '.dev' => array(
    'devMode' => true,
    'requireMatchingUserAgentForSession' => false
  ),
  '.xip.io' => array( 'devMode' => false ),
  '.co.uk' => array( 'devMode' => false )
);
