$(document).ready(function () {
  const flickrApiKey = "ca41fca0b2a4bb6d853c4fe1a870b7ba";
  const flickrApiUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
  const tags ="France, England, Greece, Italy, Madrid, Russia,Portugal,Austria,Austria, city, ,landscape,culture,traditional festivals, eiffel tower"
  const perPage = 30;
  const flickrImagesContainer = $("#photoContainer");

  const successFunctionAddImages = function (data) {
    if (data && data.photos && data.photos.photo) {
      const photos = data.photos.photo;

      flickrImagesContainer.empty();

      photos.forEach(function (photo) {
        const imgUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

        const imgElement = $("<img>")
          .attr("src", imgUrl)
          .attr("width", "400px")
          .attr("height", "400px")
          .hide();

        flickrImagesContainer.append(imgElement);

        imgElement.fadeIn();
      });
    } else {
      console.log("No photos found in the API response.");
    }
  };

  const searchFlickrImages = function (country) {
    const searchUrl = `${flickrApiUrl}&api_key=${flickrApiKey}&text=${country}&tags=${tags}&format=json&per_page=${perPage}&jsoncallback=?`;

    $.getJSON(searchUrl, successFunctionAddImages).fail(function () {
      console.log("Error in fetching Flickr data.");
    });
  };

  const setup = function () {
    $("#searchButton").on("click", function () {
      const countryName = $("#PlaceInput").val();
      searchFlickrImages(countryName);
    });
  };

  setup();
});
