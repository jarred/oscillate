oscillate = window.Oscillate ||= {}
oscillate.Views ||= {}

oscillate.Views.Audio = Backbone.View.extend
  initialize: (@o) ->
    _.bindAll @
    @$el = $(@el)
    @model = new Backbone.Model JSON.parse @$('pre.json').html()
    # SC.whenStreamingReady @initPlayer
    @initPlayer()
    return

  initSlides: ->
    $.ajax
      url: @model.get('slides')
      dataType: 'JSON'      
      success: @renderSlides
      error: () =>
        console.log 'error', arguments
        return
    return

  renderSlides: (data) ->
    @model.set
      presentation: data

    _.each @model.get('presentation').slides, (slide, index) =>
      milli = 0
      t = slide.time_till.split ':'
      milli += t[1] * 1000
      milli += t[0] * 60000
      slide.time_till_milli = milli
      slide.index = index
      return
    @$('.presentation').html oscillate.Templates.presentation @model.toJSON()

    @showSlide(0)
    @ready()
    return

  showSlide: (n) ->
    @$('.presentation .slide').removeClass 'visible'
    @$(".presentation .slide[data-index='#{n}']").addClass 'visible'
    @currentSlide = @model.get('presentation').slides[n]
    return

  initPlayer: ->
    SC.stream "/tracks/#{@model.get('interview')}", (sound) =>
      @interviewSC = sound
      @initSlides()
      return
    return

  ready: ->
    @$el.removeClass 'loading'
    @$('.play-pause').addClass 'paused'
    @$('.play-pause').bind 'click', @play
    return

  play: (e) ->
    # @showSlide 0
    e.preventDefault()
    @$('.play-pause').removeClass 'paused'
    @$('.play-pause').unbind 'click', @play
    @$('.play-pause').bind 'click', @togglePlayback
    @interviewSC.play()
    @int = setInterval @playback, 300
    return

  togglePlayback: (e) ->
    e.preventDefault()
    $el = @$('.play-pause')
    if $el.hasClass 'paused'
      @interviewSC.play()
      @$('.play-pause').removeClass 'paused'
    else
      @interviewSC.pause()
      @$('.play-pause').addClass 'paused'
    return

  playback: ->
    position = @interviewSC.position
    @$('.time').html "#{SC.Helper.millisecondsToHMS(position).replace('.', ':')}"

    slide = _.find @model.get('presentation').slides, (slide) =>
      return position < slide.time_till_milli
    
    if @currentSlide != slide
      @showSlide slide.index
    return