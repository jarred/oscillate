oscillate = window.Oscillate ||= {}
oscillate.Main =
  init: ->
    SC.initialize
      client_id: "d47b942351e59deb9ec38d90a15beb81"

    oscillate.appModel = new Backbone.Model()
    
    @extendViews()
    return

  extendViews: ->
    _.each $('.extend'), (el) =>
      $el = $(el)
      name = $el.data('view')
      return if name is null or name is ''
      return if oscillate.Views[name] is undefined
      view = new oscillate.Views[name]
        el: $el
        appModel: oscillate.appModel
      $el.removeClass 'extend'
    return