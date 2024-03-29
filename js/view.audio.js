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
    initSlides: function() {
      var _this = this;
      $.ajax({
        url: this.model.get('slides'),
        dataType: 'JSON',
        success: this.renderSlides,
        error: function() {
          console.log('error', arguments);
        }
      });
    },
    renderSlides: function(data) {
      var _this = this;
      this.model.set({
        presentation: data
      });
      _.each(this.model.get('presentation').slides, function(slide, index) {
        var milli, t;
        milli = 0;
        t = slide.time_till.split(':');
        milli += t[1] * 1000;
        milli += t[0] * 60000;
        slide.time_till_milli = milli;
        slide.index = index;
      });
      this.$('.presentation').html(oscillate.Templates.presentation(this.model.toJSON()));
      this.showSlide(0);
      this.ready();
    },
    showSlide: function(n) {
      this.$('.presentation .slide').removeClass('visible');
      this.$(".presentation .slide[data-index='" + n + "']").addClass('visible');
      this.currentSlide = this.model.get('presentation').slides[n];
    },
    initPlayer: function() {
      var _this = this;
      SC.stream("/tracks/" + (this.model.get('interview')), function(sound) {
        _this.interviewSC = sound;
        _this.initSlides();
      });
    },
    ready: function() {
      this.$el.removeClass('loading');
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
      var position, slide,
        _this = this;
      position = this.interviewSC.position;
      this.$('.time').html("" + (SC.Helper.millisecondsToHMS(position).replace('.', ':')));
      slide = _.find(this.model.get('presentation').slides, function(slide) {
        return position < slide.time_till_milli;
      });
      if (this.currentSlide !== slide) this.showSlide(slide.index);
    }
  });

}).call(this);
