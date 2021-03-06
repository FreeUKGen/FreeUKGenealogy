/**
 * @author    Supercool Ltd <josh@supercooldesign.co.uk>
 * @copyright Copyright (c) 2014, Supercool Ltd
 * @see       http://supercooldesign.co.uk
 */

(function($){

/**
 * PimpMyMatrix Class
 */
Craft.PimpMyMatrix = Garnish.Base.extend(
{

  buttonConfig: null,

  $matrixContainer: null,

  init: function(buttonConfig)
  {
    this.$matrixContainer = $('#entry-form .matrix');

    this.buttonConfig = buttonConfig;

    this.addListener(Garnish.$win, 'load', 'loopMatrixFields');
  },

  loopMatrixFields: function()
  {

    var that = this;

    // loop each matrix field
    this.$matrixContainer.each($.proxy(function()
    {

      // sort buttons
      that.sortButtons($(this));

    }), this);

  },

  sortButtons: function($matrixField)
  {

    // get matrix field handle out of DOM
    var matrixFieldHandle = this._getMatrixFieldName($matrixField, true);

    // look for an object that matches this field in the config array
    if ( typeof this.buttonConfig !== "undefined" )
    {
      var buttonConfig = $.grep(this.buttonConfig, function(e){ return e.fieldHandle === matrixFieldHandle; });

      // if we found one (and it has at least one group)
      if ( typeof buttonConfig[0] !== "undefined" )
      {

        // find the original buttons
        var $origButtons = $matrixField.find('> .buttons').first();

        // from there, check if we've already pimped those buttons
        if ( $origButtons.next('.buttons-pimped').length < 1 )
        {

          // if we haven't already pimped them, hide the original ones and start the button pimping process
          $origButtons.hide();

          // make our own container, not using .buttons as it gets event binds
          // from MatrixInput.js that we really don't want
          var $ourButtons = $('<div class="buttons-pimped" />').insertAfter($origButtons),
              $ourButtonsInner = $('<div class="btngroup" />').appendTo($ourButtons);

          // loop each blockType / group pairing
          var buttonObject = buttonConfig[0].config;
          for (var key in buttonObject)
          {

            // check if group exists, add if not
            if ( $ourButtonsInner.find('[data-pimped-group="'+buttonObject[key]['group']+'"]').length === 0 )
            {
              $('<div class="btn  menubtn">'+buttonObject[key]['group']+'</div><div class="menu" data-pimped-group="'+buttonObject[key]['group']+'"><ul /></div>').appendTo($ourButtonsInner);
            }

            // find sub group
            $groupUl = $ourButtonsInner.find('[data-pimped-group="'+buttonObject[key]['group']+'"] ul');

            // make link in new sub group
            $('<li><a data-type="'+buttonObject[key]['blockType']['handle']+'">'+buttonObject[key]['blockType']['name']+'</a></li>').appendTo($groupUl);

          }

          // make triggers MenuBtns
          $ourButtonsInner.find('.menubtn').each(function()
          {

            new Garnish.MenuBtn($(this),
            {
              onOptionSelect: function(option)
              {
                // find our type and click the correct original btn!
                var type = $(option).data('type');
                $origButtons.find('[data-type="'+type+'"]').trigger('click');
              }
            });

          });

        }
      }
    }

  },

  /**
   * This simply returns a fieldHandle if it can get one or false if not
   */
  _getMatrixFieldName: function($matrixField, fromId)
  {
    if ( fromId )
    {
      var matrixFieldId = $matrixField.parents('.field').prop('id'),
          parts = matrixFieldId.split("-"),
          matrixFieldHandle = parts[1];
    }
    else
    {
      var matrixFieldName = $matrixField.siblings('input[type="hidden"][name*="fields"]').prop('name'),
          regExp  = /fields\[([^\]]+)\]/,
          matches = regExp.exec(matrixFieldName),
          matrixFieldHandle = matches[1];
    }

    if ( matrixFieldHandle != '' )
    {
      return matrixFieldHandle;
    }
    else
    {
      return false;
    }
  }

});




/**
 * Settings Class
 */
Craft.PimpMyMatrixSettings = Garnish.Base.extend(
{

  buttonConfig: null,
  reconstructSettingsTimeout: null,
  onSettingsPage: null,

  init: function(buttonConfig)
  {
    // alias this
    var that = this;

    // get config
    this.buttonConfig = buttonConfig;

    // for safety presume not on settings page
    this.onSettingsPage = false;

    // bind settings page form submit event
    this.addListener($('#content form'), 'submit', 'onButtonConfiguratorSubmit');

    // loop the fields we have on the page
    $('.pimpmymatrix-settings__list').each(function(){

      // get matrixFieldHandle
      var matrixFieldHandle = $(this).data('pimpmymatrix-field-handle');

      // check for a stored config
      var hasConfig = false;
      if ( that.buttonConfig !== undefined )
      {
        var buttonConfig = $.grep(that.buttonConfig, function(e){ return e.fieldHandle === matrixFieldHandle; });

        if ( buttonConfig[0] !== undefined )
        {
          hasConfig = true;
        }
      }

      // work out the groups - couldn’t we just get these from the php?
      if ( hasConfig )
      {
        var configObject = buttonConfig[0].config,
            groupArray = [];

        for (var key in configObject)
        {

          if ( ! Craft.inArray(configObject[key].group, groupArray) )
          {
            // save in array for later
            groupArray.push(configObject[key].group);
          }

        }
      }

      // loop this fields’ blockTypes
      $(this).children('li').each(function(){

        // add our group select box
        var blockTypeHandle = $(this).data('pimpmymatrix-blocktype-handle'),
            blockTypeName = $(this).data('pimpmymatrix-blocktype-name'),
            $field =$('<div class="field">'+
              '<div class="heading">'+
                '<label for="pimpmymatrix-blocktypeselect-'+blockTypeHandle+'">'+blockTypeName+'</label>'+
              '</div>'+
              '<div class="input"><div class="select"></div></div>'+
            '</div>'),
            $select = $('<select id="pimpmymatrix-blocktypeselect-'+blockTypeHandle+'" name="pimpmymatrix-blocktypeselect-'+blockTypeHandle+'" />').appendTo($field.find('.select'));

        $('<option value="" selected></option>').appendTo($select);

        // add any existing options
        if ( hasConfig )
        {
          for (var key in groupArray) {
            $('<option value="'+groupArray[key]+'">'+groupArray[key]+'</option>').appendTo($select);
          }
        }

        // add field to this li
        $(this).append($field);

        if ( hasConfig )
        {
          // get config from current settings by blockType.handle
          var blockTypeConfig = $.grep(configObject, function(e){ return e.blockType.handle === blockTypeHandle; });

          // check its in the settings array
          if ( blockTypeConfig[0] !== undefined )
          {
            // set value of the select
            $(this).find('select').val(blockTypeConfig[0].group);
          }

        }

      });

    });


  },

  bindTextchanges: function(settings)
  {

    // bind textchanges on textareas inside table
    var $textareas = $('#'+settings.tableId).find('tbody textarea');
    this.addListener($textareas, 'textchange', 'reconstructSelects');

  },

  reconstructSelects: function()
  {

    var that = this;

    // loop all fields
    $('.pimpmymatrix-settings__list').each(function(){

      // make new option list from table
      $selectTmlp = $('<select><option value=""></option></select>');
      $('#settings-pimpmymatrix-grouptable-'+$(this).data('pimpmymatrix-field-handle')).find('tbody textarea').each(function(){
        $('<option value="'+$(this).val()+'">'+$(this).val()+'</option>').appendTo($selectTmlp);
      });

      // loop each li
      $(this).find('li').each(function(){

        // replace select with options from our select template
        var $select = $(this).find('select'),
            selectVal = $select.val();

        // remove options
        $(this).find('option').remove();

        // clone in our new options
        $selectTmlp.find('option').clone().appendTo($select);

        // set the value of the select back
        $select.val(selectVal);

      });

    }).promise().done(function(){
      that.reconstructSettings();
    });

  },

  reconstructSettings: function()
  {

    if (this.reconstructSettingsTimeout)
    {
      clearTimeout(this.reconstructSettingsTimeout);
    }

    this.reconstructSettingsTimeout = setTimeout(function()
    {

      var settingsArray = [];

      // loop each field
      $('.pimpmymatrix-settings__list').each(function(){

        var hasSomeValue = false;

        // make settings object
        var settingsObject = {
          "fieldHandle" : $(this).data('pimpmymatrix-field-handle'),
          "config" : []
        };

        // loop li's
        $(this).find('li').each(function(){

          // check we have a value in the select
          var selectVal = $(this).find('select').val();
          if ( selectVal !== '' && selectVal !== null )
          {
            // set this to true so we know at least one of them was selected
            hasSomeValue = true;

            // add to config array in the object
            settingsObject.config.push(
              {
                "blockType" : {
                  "handle"  : $(this).data('pimpmymatrix-blocktype-handle'),
                  "name"    : $(this).data('pimpmymatrix-blocktype-name')
                },
                "group"     : selectVal
              }
            );
          }

        });

        // if there was at least one group value
        // push the whole object into the settingsArray
        if ( hasSomeValue )
        {
          settingsArray.push(settingsObject);
        }

      });

      // pop the settingsArray into our hidden field
      $('#settings-buttonConfig').val(JSON.stringify(settingsArray));

    }, 300);

  },


  /**
   * This hi-jacks the submit for the settings page form
   * so we can run the reconstructSettings() function first
   */
  onButtonConfiguratorSubmit: function(ev)
  {

    if ( this.onSettingsPage )
    {

      ev.preventDefault();

      this.reconstructSettings();

      var that = this,
          submittimer = setTimeout(function()
      {
        that.removeListener($('#content form'), 'submit');
        $('#content form').trigger('submit');
      },400);

    }

  }

});


})(jQuery);
