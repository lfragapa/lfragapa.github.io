$(document).ready(function() {
  $('#exp-gallery').on('click', '.exp-item img', function() {
    const $img = $(this);
    const $desc = $img.siblings('.exp-desc');
    $img.fadeOut(300, function() {
      $desc.fadeIn(300);
    });
  });

  $('#exp-gallery').on('keydown', '.exp-item img, .exp-item .exp-desc', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).trigger('click');
    }
  });

  $('#exp-gallery').on('click', '.exp-desc', function() {
    const $desc = $(this);
    const $img = $desc.siblings('img');
    $desc.fadeOut(300, function() {
      $img.fadeIn(300);
    });
  });
});
