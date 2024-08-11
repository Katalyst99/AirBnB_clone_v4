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

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
