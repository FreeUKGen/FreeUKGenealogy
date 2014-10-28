<?php

/**
 * Dynamic Site Routes
 *
 * If you’d prefer to set up your site routes in a file as opposed to Settings > Routes in the CP,
 * you can define them here.  Craft will check both places for dynamic site routes.
 *
 * Each route will take up one element in the array returned by this file.
 * The array keys are your URL patterns, and the values are the templates that should get loaded.
 *
 * The URL patterns are regular expressions. If you want to capture portions of the URL and
 * make them available to your template, use named subpatterns. For example:
 *
 *     'blog/archive/(?P<year>\d{4})' => 'blog/_archive',
 *
 * That example would match URIs such as "blog/archive/2012", and pass the request along to
 * the blog/_archive template, providing it a ‘year’ variable set to the value “2012”.
 */

return array(
  'blog/(?P<year>\d{4})'                  => 'blog/_archive',
  'blog/(?P<year>\d{4})/(?P<month>\d{2})' => 'blog/_archive',
  'blog/category/(?P<category>[^/]*)'     => 'blog/_category',
  'blog/tag/(?P<tag>[^/]*)'               => 'blog/_tag',
  'blog/rss'                              => 'blog/_rss.rss',
  'blog/author/(?P<username>[^/]*)'       => 'blog/_author',


  'sitemap'                               => '_pages/sitemap',
  'search'                                => '_pages/search'
);
