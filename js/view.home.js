(function() {
  var oscillate;

  oscillate = window.Oscillate || (window.Oscillate = {});

  oscillate.Views || (oscillate.Views = {});

  oscillate.Views.Home = Backbone.View.extend({
    initialize: function(o) {
      this.o = o;
      _.bindAll(this);
      this.$el = $(this.el);
      SC.whenStreamingReady(this.addBackgroundNoise);
    },
    addBackgroundNoise: function() {
      var _this = this;
      SC.stream("/tracks/31771791", function(sound) {
        sound.setVolume(0);
        sound.play();
      });
    }
  });

}).call(this);
