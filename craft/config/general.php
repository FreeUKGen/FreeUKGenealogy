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
    'omitScriptNameInUrls' => true,
    'usePathInfo' => true,
    'defaultImageQuality' => 100,
    'pageTrigger' => 'page-',
    'overridePhpSessionLocation' => false,
    'cacheDuration' => 'PT1H',
    'omitScriptNameInUrls' => true,
  ),
  '.net' => array( 
    'devMode' => true,
  ),
  '.dev' => array(
    'devMode' => true,
    'requireMatchingUserAgentForSession' => false,
  ),
  '.xip.io' => array( 
    'devMode' => false,
  ),
  '.org.uk' => array(
    'devMode' => false,
    'defaultCookieDomain' => '.freeukgenealogy.org.uk',
	  'siteUrl' => 'https://www.freeukgenealogy.org.uk',
    'baseCpUrl' => 'https://www.freeukgenealogy.org.uk',
    'environmentVariables' => array(
      'assetsBasePath' => './assets', 
      'assetsBaseUrl' => '.assets', 
      'craftBasePath' => '../craft/', 
      'craftBaseUrl' => '../craft/', 
      'basePath' => '../public', 
      'baseUrl' => '../public'
    )
  )
);
