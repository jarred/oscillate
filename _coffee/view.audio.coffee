oscillate = window.Oscillate ||= {}
oscillate.Views ||= {}

oscillate.Views.Audio = Backbone.View.extend
  initialize: (@o) ->
    _.bindAll @
    @$el = $(@el)
    @model = new Backbone.Model JSON.parse @$('pre.json').html()
    # @initPlayer()
    SC.whenStreamingReady @initPlayer
    return

  initPlayer: ->
    SC.stream @model.get('interview'), (sound) =>
      @interviewSC = sound
      # @interviewSC.play()
      @ready()
      return
    return

  ready: ->
    if @interviewSC?
      @$el.removeClass 'loading'
      console.log @interviewSC

    @$('.play-pause').addClass 'paused'
    @$('.play-pause').bind 'click', @play
    return

  play: (e) ->
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
    x = position / 1000
    seconds = x % 60 | 0
    x /= 60
    minutes = x % 60 | 0
    seconds = String(seconds)
    minutes = String(minutes)
    if seconds.length <= 1
      seconds = "0#{seconds}"
    if minutes.length <= 1
      minutes = "0#{minutes}"
    @$('.time').html "#{minutes}:#{seconds}"
    return