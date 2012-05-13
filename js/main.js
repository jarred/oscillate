(function() {
  var oscillate;

  oscillate = window.Oscillate || (window.Oscillate = {});

  oscillate.Main = {
    init: function() {
      SC.initialize({
        client_id: "d47b942351e59deb9ec38d90a15beb81"
      });
      oscillate.appModel = new Backbone.Model();
      this.extendViews();
    },
    extendViews: function() {
      var _this = this;
      _.each($('.extend'), function(el) {
        var $el, name, view;
        $el = $(el);
        name = $el.data('view');
        if (name === null || name === '') return;
        if (oscillate.Views[name] === void 0) return;
        view = new oscillate.Views[name]({
          el: $el,
          appModel: oscillate.appModel
        });
        return $el.removeClass('extend');
      });
    }
  };

}).call(this);
