// JavaScript Document
(function ($) {
  Drupal.behaviors.map_general = {
    attach: function (context, settings) {
      $('body', context).once('map_pan', function () {
        $.each($('.openlayers-map'), function(index, map_jq) {
          if (!$(map_jq).hasClass('openlayers-map-related-event-partner')) {
            var map = $(map_jq).data('openlayers').openlayers;
            map.pan(0, -30, {animate: false});
          }
        })
      });
      $('body', context).once('map_popup', function () {
        function close_popups (e) {
          if ($(e.target).is('#popup_GroupDiv')) {
            $.each($('.openlayers-map'), function(index, map_jq) {
              var map = $(map_jq).data('openlayers').openlayers;
              $('.olPopupCloseBox').trigger('click');
            })
          }
          if (!$(e.target).is('#popup_GroupDiv') && !$(e.target).is('#popup_close')) {
            if ($(e.target).closest('.event-tooltip').find('.views-field-title a').length > 0) {
              window.location.assign($(e.target).closest('.event-tooltip').find('.views-field-title a').attr('href'));
            }
          }
        }
        $('.olMapViewport').bind('click', function(e) {
          setTimeout(function(){
            $('.olPopup').unbind('click');
            $('.olPopup').bind('click', close_popups);
            if ($('.olPopup .field-content img').width() > 185) {
              $('.olPopup .field-content img').css('width', '185px');
              $('.olPopup .field-content img').css('height', 'auto');
            }
          }, 10);
        });
        $('.olPopup').bind('click', close_popups);
      });
    }
  };
})(jQuery);
;
