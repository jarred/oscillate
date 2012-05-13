(function() {
  var oscillate;

  oscillate = window.Oscillate || (window.Oscillate = {});

  oscillate.Templates = {
    presentation: _.template("<% _.each(presentation.slides, function(slide, index){ %>\n  <div class=\"slide\" data-index=\"<%= index %>\">\n    <div class=\"image\" style=\"background-image:url('<%= presentation.directory %><%= slide.image %>');\"></div>\n  </div>\n<% }); %>")
  };

}).call(this);
