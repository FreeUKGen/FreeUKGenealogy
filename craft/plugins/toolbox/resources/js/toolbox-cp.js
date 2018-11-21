/**
 * @author    Supercool Ltd <josh@supercooldesign.co.uk>
 * @copyright Copyright (c) 2014, Supercool Ltd
 * @see       http://supercooldesign.co.uk
 * @package   Toolbox
 */

(function($){

/**
 * ToolboxCp Class
 */
Craft.ToolboxCp = Garnish.Base.extend(
{

  modal: null,

  init: function()
  {

    // ping nav re-labeller
    this.reLabelNav();

    // add freshdesk button
    if ( $('#header-actions').find('.support').length < 1 )
    {
      $('#header-actions li.first').removeClass('first').before('<li class="first"><a class="toolbox-freshdesk-trigger  support" data-icon="help" title="Tech Support"></a></li>');

      this.addListener($('.toolbox-freshdesk-trigger'), 'click', 'showFreshdeskModal');
    }

  },

  showFreshdeskModal: function()
  {

    if (!this.modal)
    {

      var $modal = $('<div id="freshwidget" class="modal"></div>').appendTo(Garnish.$bod),
          $body  = $('<div class="body"></div>').appendTo($modal),
          $iframe = $('<iframe class="freshwidget-embedded-form" id="freshwidget-embedded-form" src="http://supercool.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&screenshot=no&searchArea=no" scrolling="no" height="500px" width="100%" frameborder="0"></iframe>').appendTo($body),
          $cancelBtn = $('<div class="btn right" data-icon="error"></div><div class="spinner"></div>').prependTo($body);

      this.modal = new Garnish.Modal($modal);

      this.addListener($cancelBtn, 'click', function() {
        this.modal.hide();
      });

    }
    else
    {
      this.modal.show();
    }

  },

  reLabelNav: function()
  {

    // Entries
    $('#nav-entries a').text(Craft.t('Content'));
    if ( $('#page-header h1').text() == 'Entries' )
    {
      $('#page-header h1').text(Craft.t('Content'));
    }

    // Assets
    $('#nav-assets a').text(Craft.t('Files'));
    if ( $('#page-header h1').text() == 'Assets' )
    {
      $('#page-header h1').text(Craft.t('Files'));
    }

    // Globals
    $('#nav-globals a').text(Craft.t('Settings'));
    if ( $('#page-header h1').text() == 'Globals' )
    {
      $('#page-header h1').text(Craft.t('Settings'));
    }

  }

});

})(jQuery);
