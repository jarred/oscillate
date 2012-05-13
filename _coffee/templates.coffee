oscillate = window.Oscillate ||= {}
oscillate.Templates =
  presentation: _.template """
    <% _.each(presentation.slides, function(slide, index){ %>
      <div class="slide" data-index="<%= index %>">
        <div class="image" style="background-image:url('<%= presentation.directory %><%= slide.image %>');"></div>
      </div>
    <% }); %>
  """