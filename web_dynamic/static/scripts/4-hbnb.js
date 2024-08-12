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

  function getPlaces (amenities) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify(amenities),
      dataType: 'json',
      contentType: 'application/json',
      success: data => {
        $('section.places').empty();
        $('section.places').append(data.map(place => {
          return `<article>
                    <div class="title_box">
                      <h2>${place.name}</h2>
                      <div class="price_by_night">${place.price_by_night}</div>
                    </div>
                    <div class="information">
                      <div class="max_guest">${place.max_guest} Guests</div>
                      <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                      <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                    </div>
                    <div class="description">
                      ${place.description}
                    </div>
                  </article>`;
        }));
      }
    });
  }

  getPlaces({});

  $('.filters button').click(function () {
    const amenities = { amenities: Object.keys(amenitiesCheck) };
    getPlaces(amenities);
  });
});
