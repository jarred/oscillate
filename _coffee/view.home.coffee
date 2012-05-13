oscillate = window.Oscillate ||= {}
oscillate.Views ||= {}

oscillate.Views.Home = Backbone.View.extend
  initialize: (@o) ->
    _.bindAll @
    @$el = $(@el)
    SC.whenStreamingReady @addBackgroundNoise
    return

  addBackgroundNoise: ->
    SC.stream "/tracks/31771791", (sound) =>
      sound.setVolume 0
      sound.play()
      return
    return