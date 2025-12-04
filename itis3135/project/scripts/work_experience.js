/* work_experience.js - implements a mini gallery interaction: clicking the image fades out and shows the description; clicking description fades back to image. */
$(document).ready(function() {
  $('#exp-gallery').on('click', '.exp-item img', function() {
    const $img = $(this);
    const $desc = $img.siblings('.exp-desc');
    // fade out image and fade in description
    $img.fadeOut(300, function() {
      $desc.fadeIn(300);
    });
  });

  // Support keyboard activation (Enter or Space) for accessibility
  $('#exp-gallery').on('keydown', '.exp-item img, .exp-item .exp-desc', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).trigger('click');
    }
  });

  $('#exp-gallery').on('click', '.exp-desc', function() {
    const $desc = $(this);
    const $img = $desc.siblings('img');
    // fade out description and fade in image
    $desc.fadeOut(300, function() {
      $img.fadeIn(300);
    });
  });
});
