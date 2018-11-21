/**
 |------------------------------------------------------------|
 | Fit images                                                 |
 |------------------------------------------------------------|
 */

var fitImages = function(options) {

  $(window).on('resize', function(){

    $(options.imageWrapper).height($(options.container).height());

    $(options.imageWrapper).imgLiquid({
      fill: false,
      horizontalAlign: "center",
      verticalAlign: "center"
    });

  }).resize();

}
