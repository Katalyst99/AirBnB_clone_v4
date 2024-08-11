$(document).ready(function () {
  const amenitiesCheck = {};
  $('input[type=checkbox]').change(function () {
    const amenityId = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      amenitiesCheck[amenityId] = $(this).attr('data-name');
    } else {
      delete amenitiesCheck[amenityId];
    }
    $('.amenities h4').text(Object.values(amenitiesCheck).join(', '));
  });
});
