/* project_overview.js
   - Loads gallery JSON via AJAX
   - Sets up jQuery UI widgets: accordion, datepicker, dialog
   - Implements booking form client-side validation and simulated AJAX submit
*/

$(document).ready(function() {
  // Service accordion is initialized on the Services page; not required here.

  // Datepicker initialization for booking form is handled on the contact page.

  // Load gallery via AJAX (read-only)
  $.getJSON('data/gallery.json')
    .done(function(data) {
      const grid = $("#gallery-grid");
      grid.empty();
      data.forEach(function(item) {
        const img = $("<img/>")
          .attr('src', item.thumb)
          .attr('alt', item.title)
          .attr('data-full', item.url)
          .attr('data-title', item.title)
          .attr('data-description', item.description);
        const wrapper = $("<figure class='thumb'></figure>").append(img)
          .append($(`<figcaption>${item.title}</figcaption>`));
        grid.append(wrapper);
      });

      // Click handler: open dialog with full image & description
      grid.on('click', 'img', function() {
        const src = $(this).attr('data-full');
        const title = $(this).attr('data-title');
        const desc = $(this).attr('data-description');
        $('#gallery-dialog').html(`<h3>${title}</h3><img src='${src}' alt='${title}' style='max-width:100%;'><p>${desc}</p>`);
        $('#gallery-dialog').dialog({ width: 700, modal: true, title: title });
      });
    })
    .fail(function() {
      $('#gallery-grid').html('<p>Unable to load gallery at this time.</p>');
    });

  // Booking form moved to contact page; booking handling moved to contact.js

});
