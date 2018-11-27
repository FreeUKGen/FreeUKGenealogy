<?php

/**
 * Supercooler by Supercool.
 *
 * @package   Supercooler
 * @author    Josh Angell
 * @copyright Copyright (c) 2014, Supercool
 */

namespace Craft;

class SupercoolerService extends BaseApplicationComponent
{

  public function run()
  {

    /**
     * Install a bunch of plugins first
     */
    $plugins = array(
      array('pimpMyMatrix', 'Pimp My Matrix'),
      array('fetch', 'Fetch'),
      array('introvert', 'Introvert'),
      array('import', 'Import'),
      array('slugify', 'Slugify'),
      array('auditLog', 'Audit Log'),
      array('anchors', 'Anchors'),
      array('help', 'Help'),
      array('buttonBox', 'Button Box'),
      array('toolbox', 'Toolbox')
    );

    foreach ($plugins as $plugin) {
      if (craft()->plugins->installPlugin($plugin[0]))
      {
        Craft::log($plugin[1].' successfully installed.');
      }
      else
      {
        Craft::log('Could not install '.$plugin[1].'.', LogLevel::Error);
      }
    }

    /**
     * Remove Crafts default fields / channels etc
     */

    // tag group
    if (craft()->tags->deleteTagGroupById(1)) {
      Craft::log('Crafts default tag group removed successfully.');
    }
    else
    {
      Craft::log('Could not remove the Craft default tag group.', LogLevel::Error);
    }


    // field group
    if (craft()->fields->deleteGroupById(1)) {
      Craft::log('Crafts default field group removed successfully.');
    }
    else
    {
      Craft::log('Could not remove the Craft default field group.', LogLevel::Error);
    }


    // news section
    if (craft()->sections->deleteSectionById(2)) {
      Craft::log('Crafts default News section removed successfully.');
    }
    else
    {
      Craft::log('Could not remove the Craft default News section.', LogLevel::Error);
    }



    /**
     * Install our fields
     */

    // Default field group

    Craft::log('Creating the Supercooler Default field group.');

    $group = new FieldGroupModel();
    $group->name = Craft::t('Default');

    if (craft()->fields->saveGroup($group))
    {
      Craft::log('Supercooler Default field group created successfully.');
    }
    else
    {
      Craft::log('Could not save the Supercooler Default field group.', LogLevel::Error);
    }


    // Hide Title field

    Craft::log('Creating the Supercooler Hide Title field.');

    $hideTitleField = new FieldModel();
    $hideTitleField->groupId      = $group->id;
    $hideTitleField->name         = Craft::t('Hide Title');
    $hideTitleField->handle       = 'hideTitle';
    $hideTitleField->required     = false;
    $hideTitleField->translatable = true;
    $hideTitleField->type         = 'Lightswitch';

    if (craft()->fields->saveField($hideTitleField))
    {
      Craft::log('Supercooler Hide Title field created successfully.');
    }
    else
    {
      Craft::log('Could not save the Supercooler Hide Title field.', LogLevel::Error);
    }


    // Article field

    Craft::log('Creating the Supercooler Article field.');

    $articleField = new FieldModel();
    $articleField->groupId      = $group->id;
    $articleField->name         = Craft::t('Article');
    $articleField->handle       = 'article';
    $articleField->required     = false;
    $articleField->translatable = true;
    $articleField->type         = 'Matrix';


    // setup matrix settings
    $matrixSettings = new MatrixSettingsModel($articleField);
    $blockTypes = array();

    // ----------------- //
    // matrix blocktypes //
    // ----------------- //

    /**
     * Text blocktype
     */

    $blockType = new MatrixBlockTypeModel();
    $blockType->id     = 'new1';
    $blockType->name   = 'Text';
    $blockType->handle = 'text';

    // blocktype fields
    $fields = array();

      $field = new FieldModel();
      $field->id           = 'new1';
      $field->name         = 'Text';
      $field->handle       = 'text';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'RichText';
      $field->settings = array(
        'configFile' => 'Article.json'
      );

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new2';
      $field->name         = 'Type';
      $field->handle       = 'textType';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_TextSize';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'Small',
            'value' => 'smallprint',
            'pxVal' => '13'
          ),
          array(
            'label' => 'Medium',
            'value' => '',
            'pxVal' => '16',
            'default' => true
          ),
          array(
            'label' => 'Large',
            'value' => 'lede',
            'pxVal' => '20'
          ),
          array(
            'label' => 'Mega',
            'value' => 'gamma',
            'pxVal' => '24'
          )
        )
      );

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new3';
      $field->name         = 'Width';
      $field->handle       = 'width';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_Width';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'One Third',
            'value' => 'one-third'
          ),
          array(
            'label' => 'Two Thirds',
            'value' => 'two-thirds',
            'default' => true
          ),
          array(
            'label' => 'Full Width',
            'value' => 'one-whole'
          )
        )
      );

      $fields[] = $field;


    $blockType->setFields($fields);

    $blockTypes[] = $blockType;


    /**
     * Button blocktype
     */

    $blockType = new MatrixBlockTypeModel();
    $blockType->id     = 'new2';
    $blockType->name   = 'Button';
    $blockType->handle = 'button';

    // blocktype fields
    $fields = array();

      $field = new FieldModel();
      $field->id           = 'new1';
      $field->name         = 'Link';
      $field->handle       = 'buttonLink';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'PlainText';

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new2';
      $field->name         = 'Label';
      $field->handle       = 'label';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'PlainText';

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new3';
      $field->name         = 'Width';
      $field->handle       = 'width';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_Width';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'One Third',
            'value' => 'one-third',
            'default' => true
          ),
          array(
            'label' => 'Two Thirds',
            'value' => 'two-thirds'
          ),
          array(
            'label' => 'Full Width',
            'value' => 'one-whole'
          )
        )
      );

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new4';
      $field->name         = 'Colour';
      $field->handle       = 'colour';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_Colours';
      $field->settings = array(
        'options' => array(
          array(
            'label'     => 'Red',
            'value'     => 'red',
            'cssColour' => '#d9603b'
          ),
          array(
            'label'     => 'Green',
            'value'     => 'green',
            'cssColour' => '#328d7e',
            'default'   => true
          ),
          array(
            'label'     => 'Navy',
            'value'     => 'navy',
            'cssColour' => '#17333a'
          ),
          array(
            'label'     => 'Brown',
            'value'     => 'brown',
            'cssColour' => '#818b80'
          )
        )
      );

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new5';
      $field->name         = 'Size';
      $field->handle       = 'weight';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_TextSize';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'Small',
            'value' => 'smallprint',
            'pxVal' => '13',
            'default' => true
          ),
          array(
            'label' => 'Medium',
            'value' => '',
            'pxVal' => '16'
          ),
          array(
            'label' => 'Large',
            'value' => 'lede',
            'pxVal' => '20'
          )
        )
      );

      $fields[] = $field;


    $blockType->setFields($fields);

    $blockTypes[] = $blockType;


    /**
     * Download blocktype
     */

    $blockType = new MatrixBlockTypeModel();
    $blockType->id     = 'new3';
    $blockType->name   = 'Download';
    $blockType->handle = 'download';

    // blocktype fields
    $fields = array();

      $field = new FieldModel();
      $field->id           = 'new1';
      $field->name         = 'Download';
      $field->handle       = 'file';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'Assets';
      $field->settings = array(
        'limit' => 1
      );

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new2';
      $field->name         = 'Label';
      $field->handle       = 'label';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'PlainText';

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new3';
      $field->name         = 'Width';
      $field->handle       = 'width';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_Width';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'One Third',
            'value' => 'one-third',
            'default' => true
          ),
          array(
            'label' => 'Two Thirds',
            'value' => 'two-thirds'
          ),
          array(
            'label' => 'Full Width',
            'value' => 'one-whole'
          )
        )
      );

      $fields[] = $field;


    $blockType->setFields($fields);

    $blockTypes[] = $blockType;



    /**
     * Embed blocktype
     */

    $blockType = new MatrixBlockTypeModel();
    $blockType->id     = 'new4';
    $blockType->name   = 'Embed';
    $blockType->handle = 'embed';

    // blocktype fields
    $fields = array();

      $field = new FieldModel();
      $field->id           = 'new1';
      $field->name         = 'Embed URL';
      $field->handle       = 'emebdUrl';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'Fetch';

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new2';
      $field->name         = 'Width';
      $field->handle       = 'width';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_Width';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'One Third',
            'value' => 'one-third'
          ),
          array(
            'label' => 'Two Thirds',
            'value' => 'two-thirds',
            'default' => true
          ),
          array(
            'label' => 'Full Width',
            'value' => 'one-whole'
          )
        )
      );

      $fields[] = $field;


    $blockType->setFields($fields);

    $blockTypes[] = $blockType;



    /**
     * Form blocktype
     */

    $blockType = new MatrixBlockTypeModel();
    $blockType->id     = 'new5';
    $blockType->name   = 'Form';
    $blockType->handle = 'form';

    // blocktype fields
    $fields = array();

      $field = new FieldModel();
      $field->id           = 'new1';
      $field->name         = 'Handle';
      $field->handle       = 'formHandle';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'PlainText';

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new2';
      $field->name         = 'Width';
      $field->handle       = 'width';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_Width';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'One Third',
            'value' => 'one-third'
          ),
          array(
            'label' => 'Two Thirds',
            'value' => 'two-thirds',
            'default' => true
          ),
          array(
            'label' => 'Full Width',
            'value' => 'one-whole'
          )
        )
      );

      $fields[] = $field;


    $blockType->setFields($fields);

    $blockTypes[] = $blockType;



    /**
     * Heading blocktype
     */

    $blockType = new MatrixBlockTypeModel();
    $blockType->id     = 'new6';
    $blockType->name   = 'Heading';
    $blockType->handle = 'heading';

    // blocktype fields
    $fields = array();

      $field = new FieldModel();
      $field->id           = 'new1';
      $field->name         = 'Heading';
      $field->handle       = 'heading';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'PlainText';

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new2';
      $field->name         = 'Size';
      $field->handle       = 'fontSize';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_TextSize';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'Small',
            'value' => 'small',
            'pxVal' => '13'
          ),
          array(
            'label' => 'Medium',
            'value' => '',
            'pxVal' => '16',
            'default' => true
          ),
          array(
            'label' => 'Large',
            'value' => 'large',
            'pxVal' => '24'
          ),
          array(
            'label' => 'Mega',
            'value' => 'mega',
            'pxVal' => '32'
          )
        )
      );

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new3';
      $field->name         = 'Align';
      $field->handle       = 'align';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_Buttons';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'Align Left',
            'showLabel' => false,
            'value' => 'left',
            'imagePath' => '/admin/resources/buttonbox/images/align-left.png',
            'default' => true
          ),
          array(
            'label' => 'Align Center',
            'showLabel' => false,
            'value' => 'center',
            'imagePath' => '/admin/resources/buttonbox/images/align-center.png'
          ),
          array(
            'label' => 'Align Right',
            'showLabel' => false,
            'value' => 'right',
            'imagePath' => '/admin/resources/buttonbox/images/align-right.png'
          )
        )
      );

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new4';
      $field->name         = 'Width';
      $field->handle       = 'width';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_Width';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'One Third',
            'value' => 'one-third'
          ),
          array(
            'label' => 'Two Thirds',
            'value' => 'two-thirds',
            'default' => true
          ),
          array(
            'label' => 'Full Width',
            'value' => 'one-whole'
          )
        )
      );

      $fields[] = $field;


    $blockType->setFields($fields);

    $blockTypes[] = $blockType;



    /**
     * HTML blocktype
     */

    $blockType = new MatrixBlockTypeModel();
    $blockType->id     = 'new7';
    $blockType->name   = 'HTML';
    $blockType->handle = 'html';

    // blocktype fields
    $fields = array();

      $field = new FieldModel();
      $field->id           = 'new1';
      $field->name         = 'HTML';
      $field->handle       = 'html';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'PlainText';
      $field->settings = array(
        'multiline' => true,
        'initialRows' => 4
      );

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new2';
      $field->name         = 'Width';
      $field->handle       = 'width';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_Width';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'One Third',
            'value' => 'one-third'
          ),
          array(
            'label' => 'Two Thirds',
            'value' => 'two-thirds',
            'default' => true
          ),
          array(
            'label' => 'Full Width',
            'value' => 'one-whole'
          )
        )
      );

      $fields[] = $field;


    $blockType->setFields($fields);

    $blockTypes[] = $blockType;


    /**
     * Image blocktype
     */

    $blockType = new MatrixBlockTypeModel();
    $blockType->id     = 'new8';
    $blockType->name   = 'Image';
    $blockType->handle = 'image';

    // blocktype fields
    $fields = array();

      $field = new FieldModel();
      $field->id           = 'new1';
      $field->name         = 'Image';
      $field->handle       = 'image';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'Assets';
      $field->settings = array(
        'limit' => 1
      );

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new2';
      $field->name         = 'Width';
      $field->handle       = 'width';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_Width';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'One Third',
            'value' => 'one-third'
          ),
          array(
            'label' => 'Two Thirds',
            'value' => 'two-thirds',
            'default' => true
          ),
          array(
            'label' => 'Full Width',
            'value' => 'one-whole'
          )
        )
      );

      $fields[] = $field;


    $blockType->setFields($fields);

    $blockTypes[] = $blockType;


    /**
     * Quote blocktype
     */

    $blockType = new MatrixBlockTypeModel();
    $blockType->id     = 'new9';
    $blockType->name   = 'Quote';
    $blockType->handle = 'quote';

    // blocktype fields
    $fields = array();

      $field = new FieldModel();
      $field->id           = 'new1';
      $field->name         = 'Quote';
      $field->handle       = 'quote';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'RichText';
      $field->settings = array(
        'configFile' => 'Article.json'
      );

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new2';
      $field->name         = 'Cite';
      $field->handle       = 'sourceHeading';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'PlainText';

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new3';
      $field->name         = 'Link';
      $field->handle       = 'sourceUrl';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'PlainText';

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new4';
      $field->name         = 'Size';
      $field->handle       = 'quoteSize';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_TextSize';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'Small',
            'value' => '',
            'pxVal' => '13',
            'default' => true
          ),
          array(
            'label' => 'Medium',
            'value' => 'medium',
            'pxVal' => '16'
          ),
          array(
            'label' => 'Large',
            'value' => 'large',
            'pxVal' => '24'
          )
        )
      );

      $fields[] = $field;


      $field = new FieldModel();
      $field->id           = 'new5';
      $field->name         = 'Width';
      $field->handle       = 'width';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'ButtonBox_Width';
      $field->settings = array(
        'options' => array(
          array(
            'label' => 'One Third',
            'value' => 'one-third'
          ),
          array(
            'label' => 'Two Thirds',
            'value' => 'two-thirds',
            'default' => true
          ),
          array(
            'label' => 'Full Width',
            'value' => 'one-whole'
          )
        )
      );

      $fields[] = $field;


    $blockType->setFields($fields);

    $blockTypes[] = $blockType;


    /**
     * Separator blocktype
     */

    $blockType = new MatrixBlockTypeModel();
    $blockType->id     = 'new10';
    $blockType->name   = 'Separator';
    $blockType->handle = 'separator';

    // blocktype fields
    $fields = array();

      $field = new FieldModel();
      $field->id           = 'new1';
      $field->name         = 'Is this Separator visible?';
      $field->handle       = 'isItVisible';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'Lightswitch';

      $fields[] = $field;

    $blockType->setFields($fields);

    $blockTypes[] = $blockType;


    /**
     * System blocktype
     */

    $blockType = new MatrixBlockTypeModel();
    $blockType->id     = 'new11';
    $blockType->name   = 'System';
    $blockType->handle = 'system';

    // blocktype fields
    $fields = array();

      $field = new FieldModel();
      $field->id           = 'new1';
      $field->name         = 'Template Handle';
      $field->handle       = 'templateHandle';
      $field->required     = false;
      $field->translatable = true;
      $field->type         = 'PlainText';

      $fields[] = $field;

    $blockType->setFields($fields);

    $blockTypes[] = $blockType;


    // --------------------- //
    // end matrix blocktypes //
    // --------------------- //


    $matrixSettings->setBlockTypes($blockTypes);

    $articleField->settings = $matrixSettings;

    if (craft()->fields->saveField($articleField))
    {
      Craft::log('Supercooler Article field created successfully.');
    }
    else
    {
      Craft::log('Could not save the Supercooler Article field.', LogLevel::Error);
    }


    // SEO field group

    Craft::log('Creating the Supercooler SEO field group.');

    $seoGroup = new FieldGroupModel();
    $seoGroup->name = Craft::t('SEO');

    if (craft()->fields->saveGroup($seoGroup))
    {
      Craft::log('Supercooler SEO field group created successfully.');
    }
    else
    {
      Craft::log('Could not save the Supercooler SEO field group.', LogLevel::Error);
    }


    // SEO Page Title field

    Craft::log('Creating the Supercooler SEO Page Title field.');

    $pageTitleField = new FieldModel();
    $pageTitleField->groupId      = $seoGroup->id;
    $pageTitleField->name         = Craft::t('Page Title');
    $pageTitleField->handle       = 'pageTitle';
    $pageTitleField->required     = false;
    $pageTitleField->translatable = true;
    $pageTitleField->type         = 'PlainText';

    if (craft()->fields->saveField($pageTitleField))
    {
      Craft::log('Supercooler SEO Page Title field created successfully.');
    }
    else
    {
      Craft::log('Could not save the Supercooler SEO Page Title field.', LogLevel::Error);
    }


    // SEO Meta Description field

    Craft::log('Creating the Supercooler SEO Meta Description field.');

    $metaDescriptionField = new FieldModel();
    $metaDescriptionField->groupId      = $seoGroup->id;
    $metaDescriptionField->name         = Craft::t('Meta Description');
    $metaDescriptionField->handle       = 'metaDescription';
    $metaDescriptionField->required     = false;
    $metaDescriptionField->translatable = true;
    $metaDescriptionField->type         = 'PlainText';

    if (craft()->fields->saveField($metaDescriptionField))
    {
      Craft::log('Supercooler SEO Meta Description field created successfully.');
    }
    else
    {
      Craft::log('Could not save the Supercooler SEO Meta Description field.', LogLevel::Error);
    }


    // SEO Meta Keywords field

    Craft::log('Creating the Supercooler SEO Meta Keywords field.');

    $metaKeywordsField = new FieldModel();
    $metaKeywordsField->groupId      = $seoGroup->id;
    $metaKeywordsField->name         = Craft::t('Meta Keywords');
    $metaKeywordsField->handle       = 'metaKeywords';
    $metaKeywordsField->required     = false;
    $metaKeywordsField->translatable = true;
    $metaKeywordsField->type         = 'PlainText';

    if (craft()->fields->saveField($metaKeywordsField))
    {
      Craft::log('Supercooler SEO Meta Keywords field created successfully.');
    }
    else
    {
      Craft::log('Could not save the Supercooler SEO Meta Keywords field.', LogLevel::Error);
    }



    /**
     * Modify existing homepage single entry type field layout
     */
    Craft::log('Modifying the Homepage entry type.');
    $homepageSection = craft()->sections->getSectionByHandle('homepage');

    $homepageLayout = craft()->fields->assembleLayout(array(
      Craft::t('Article') => array($hideTitleField->id, $articleField->id),
      Craft::t('SEO') => array($pageTitleField->id, $metaDescriptionField->id, $metaKeywordsField->id)
    ), array(), true);

    $homepageLayout->type = ElementType::Entry;

    $homepageEntryTypes = $homepageSection->getEntryTypes();
    $homepageEntryType = $homepageEntryTypes[0];
    $homepageEntryType->setFieldLayout($homepageLayout);

    if (craft()->sections->saveEntryType($homepageEntryType))
    {
      Craft::log('Homepage entry type saved successfully.');
    }
    else
    {
      Craft::log('Could not save the Homepage entry type.', LogLevel::Error);
    }



    /**
     * Install our pages structure section
     */

    Craft::log('Creating the Pages section.');

    $pagesSection = new SectionModel();
    $pagesSection->type     = SectionType::Structure;
    $pagesSection->name     = Craft::t('Pages');
    $pagesSection->handle   = 'pages';
    $pagesSection->hasUrls  = true;
    $pagesSection->template = '_layouts/main';

    $primaryLocaleId = craft()->i18n->getPrimarySiteLocaleId();
    $locales = array();
    $locales[$primaryLocaleId] = new SectionLocaleModel(array(
      'locale'           => $primaryLocaleId,
      'enabledByDefault' => true,
      'urlFormat'        => '{slug}',
      'nestedUrlFormat'  => '{parent.uri}/{slug}'
    ));

    $pagesSection->setLocales($locales);

    if (craft()->sections->saveSection($pagesSection))
    {
      Craft::log('Pages section created successfully.');
    }
    else
    {
      Craft::log('Could not save the Pages section.', LogLevel::Error);

      // so try getting it, so we can re-use it later
      $pagesSection = craft()->sections->getSectionByHandle('pages');
    }

    Craft::log('Saving the Pages entry type.');

    $pagesLayout = craft()->fields->assembleLayout(array(
      Craft::t('Article') => array($hideTitleField->id, $articleField->id),
      Craft::t('SEO') => array($pageTitleField->id, $metaDescriptionField->id, $metaKeywordsField->id)
    ), array(), true);

    $pagesLayout->type = ElementType::Entry;

    $pagesEntryTypes = $pagesSection->getEntryTypes();
    $pagesEntryType = $pagesEntryTypes[0];
    $pagesEntryType->setFieldLayout($pagesLayout);

    if (craft()->sections->saveEntryType($pagesEntryType))
    {
      Craft::log('Pages entry type saved successfully.');
    }
    else
    {
      Craft::log('Could not save the Pages entry type.', LogLevel::Error);
    }


    /**
     * Make a 404 global
     */
    Craft::log('Making a 404 Global Set.');

    $fourOhFourGlobalSet = new GlobalSetModel();
    $fourOhFourGlobalSet->name   = '404';
    $fourOhFourGlobalSet->handle = 'fourOhFour';

    // set up field layout
    $fourOhFourFieldLayout = craft()->fields->assembleLayout(array(
      Craft::t('Content') => array($hideTitleField->id, $articleField->id)
    ), array(), false);
    $fourOhFourFieldLayout->type = ElementType::GlobalSet;
    $fourOhFourGlobalSet->setFieldLayout($fourOhFourFieldLayout);

    // save it
    if (craft()->globals->saveSet($fourOhFourGlobalSet))
    {
      Craft::log('404 Global set saved.');
    }
    else
    {
      Craft::log('Could not save the 404 Global set.', LogLevel::Error);
    }


    /**
     * Assets setup - won't respect any files already up there as yet.
     */
    Craft::log('Saving a default Assets Source.');
    $assetSource = new AssetSourceModel(array(
      'name' => 'Files',
      'type' => 'S3',
      'settings' => array(
        'keyId' => 'AKIAIPMWGL6ZTT6SBPPA',
        'secret' => '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',
        'bucket' => 'supercoolboiler',
        'subfolder' => '',
        'urlPrefix' => 'http://s3-eu-west-1.amazonaws.com/supercoolboiler/',
        'expires' => '',
        'location' => 'eu-west-1'
      )
    ));

    if (craft()->assetSources->saveSource($assetSource))
    {
      Craft::log('Assets Source saved.');
    }
    else
    {
      Craft::log('Could not save Assets Source.', LogLevel::Error);
    }


    /**
     * Pimp My Matrix settings
     */
     $settings = array('buttonConfig' => '[{"fieldHandle":"article","config":[{"blockType":{"handle":"text","name":"Text"},"group":"Text"},{"blockType":{"handle":"button","name":"Button"},"group":"Widget"},{"blockType":{"handle":"download","name":"Download"},"group":"Widget"},{"blockType":{"handle":"embed","name":"Embed"},"group":"Media"},{"blockType":{"handle":"form","name":"Form"},"group":"Widget"},{"blockType":{"handle":"heading","name":"Heading"},"group":"Text"},{"blockType":{"handle":"html","name":"HTML"},"group":"Media"},{"blockType":{"handle":"image","name":"Image"},"group":"Media"},{"blockType":{"handle":"quote","name":"Quote"},"group":"Text"},{"blockType":{"handle":"separator","name":"Separator"},"group":"Design"}]}]');

    $plugin = craft()->plugins->getPlugin('pimpMyMatrix');
    if (craft()->plugins->savePluginSettings($plugin, $settings))
    {
      Craft::log('Pimp My Matrix settings saved.');
    }
    else
    {
      Craft::log('Could not save Pimp My Matrix settings.', LogLevel::Error);
    }

  }

}
