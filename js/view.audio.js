(function() {
  var oscillate;

  oscillate = window.Oscillate || (window.Oscillate = {});

  oscillate.Views || (oscillate.Views = {});

  oscillate.Views.Audio = Backbone.View.extend({
    initialize: function(o) {
      this.o = o;
      _.bindAll(this);
      this.$el = $(this.el);
      this.model = new Backbone.Model(JSON.parse(this.$('pre.json').html()));
      SC.whenStreamingReady(this.initPlayer);
    },
    initPlayer: function() {
      var _this = this;
      SC.stream(this.model.get('interview'), function(sound) {
        _this.interviewSC = sound;
        _this.ready();
      });
    },
    ready: function() {
      if (this.interviewSC != null) {
        this.$el.removeClass('loading');
        console.log(this.interviewSC);
      }
      this.$('.play-pause').addClass('paused');
      this.$('.play-pause').bind('click', this.play);
    },
    play: function(e) {
      e.preventDefault();
      this.$('.play-pause').removeClass('paused');
      this.$('.play-pause').unbind('click', this.play);
      this.$('.play-pause').bind('click', this.togglePlayback);
      this.interviewSC.play();
      this.int = setInterval(this.playback, 300);
    },
    togglePlayback: function(e) {
      var $el;
      e.preventDefault();
      $el = this.$('.play-pause');
      if ($el.hasClass('paused')) {
        this.interviewSC.play();
        this.$('.play-pause').removeClass('paused');
      } else {
        this.interviewSC.pause();
        this.$('.play-pause').addClass('paused');
      }
    },
    playback: function() {
      var minutes, position, seconds, x;
      position = this.interviewSC.position;
      x = position / 1000;
      seconds = x % 60 | 0;
      x /= 60;
      minutes = x % 60 | 0;
      seconds = String(seconds);
      minutes = String(minutes);
      if (seconds.length <= 1) seconds = "0" + seconds;
      if (minutes.length <= 1) minutes = "0" + minutes;
      this.$('.time').html("" + minutes + ":" + seconds);
    }
  });

}).call(this);
