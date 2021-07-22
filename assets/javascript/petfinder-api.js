var PetfinderAPIKey = "OTKmTK2SiaFe8Balw0E5ZMd9NUQn1uYeBgaIxSfyDA07UeascA";
var PetfinderAPISecret = "bJdl9XOj88Jl8pRCfMnylD8bYTswVZ59314MFL2X";

function getGeolocation() {
  this.navigator.geolocation.getCurrentPosition(
    onGeolocateSuccess,
    onGeolocateError
  );
}

var Latlong;

function onGeolocateSuccess(coordinates) {
  Latlong = {
    latitude: coordinates.coords.latitude,
    longitude: coordinates.coords.longitude
  };

  const { latitude, longitude } = coordinates.coords;
  searchForCats(latitude, longitude);
}

function onGeolocateError(error) {
  // console.warn(error.code, error.message);

  // if (error.code === 1) {
  //   console.log("User declined access to their geolocation");
  // } else if (error.code === 2) {
  //   console.log("Geolocation unavailable");
  // } else if (error.code === 3) {
  //   console.log("Timeout");
  // }

  Latlong = {
    latitude: null,
    longitude: null
  };

  searchForCats(35.7963914, -78.7044064); //default coordinates
}

//called once we have enough data; determine search parameters and make API call
function searchForCats(lat, lng) {
  var queryURL = "https://api.petfinder.com/v2/oauth2/token";
  var queryData =
    "grant_type=client_credentials&client_id=" +
    PetfinderAPIKey +
    "&client_secret=" +
    PetfinderAPISecret;

  $.ajax({
    url: queryURL,
    method: "POST",
    data: queryData
  }).then(function (response) {
    var token = response.access_token;

    var requestHeader = "Bearer " + token;
    queryURL = "https://api.petfinder.com/v2/animals";

    var coatQuery = "";
    if (likeCounts.coat.short >= likeCounts.coat.long) {
      coatQuery += "&coat=short";
    }
    if (likeCounts.coat.long >= likeCounts.coat.short) {
      coatQuery += "&coat=medium,long";
    }

    var ageQuery = "";
    if (likeCounts.age.kitten >= likeCounts.age.adult) {
      ageQuery += "&age=baby,young";
    }
    if (likeCounts.age.adult >= likeCounts.age.kitten) {
      ageQuery += "&age=adult,senior";
    }

    var colorQuery = "";
    var currentMax = 0;

    //orange
    if (likeCounts.color.orange > currentMax) {
      currentMax = likeCounts.color.orange;
      colorQuery = "&color=Orange+%26+White,Orange+%2F+Red";
    } else if (likeCounts.color.orange === currentMax) {
      colorQuery += "&color=Orange+%26+White,Orange+%2F+Red";
    }
    //black
    if (likeCounts.color.black > currentMax) {
      currentMax = likeCounts.color.black;
      colorQuery = "&color=Black";
    } else if (likeCounts.color.black === currentMax) {
      colorQuery += "&color=Black";
    }
    //gray
    if (likeCounts.color.gray > currentMax) {
      currentMax = likeCounts.color.gray;
      colorQuery =
        "&color=Gray+%2F+Blue+%2F+Silver,Smoke,Tabby+%28Gray+%2F+Blue+%2F+Silver%29";
    } else if (likeCounts.color.gray === currentMax) {
      colorQuery +=
        "&color=Gray+%2F+Blue+%2F+Silver,Smoke,Tabby+%28Gray+%2F+Blue+%2F+Silver%29";
    }
    //white
    if (likeCounts.color.white > currentMax) {
      currentMax = likeCounts.color.white;
      colorQuery = "&color=Cream+%2F+Ivory,White";
    } else if (likeCounts.color.white === currentMax) {
      colorQuery += "&color=Cream+%2F+Ivory,White";
    }
    //calico
    if (likeCounts.color.calico > currentMax) {
      currentMax = likeCounts.color.calico;
      colorQuery = "&color=Calico,Dilute+Calico";
    } else if (likeCounts.color.calico === currentMax) {
      colorQuery += "&color=Calico,Dilute+Calico";
    }
    //tabby
    if (likeCounts.color.tabby > currentMax) {
      currentMax = likeCounts.color.tabby;
      colorQuery =
        "&color=Tabby+%28Brown+%2F+Chocolate%29,Tabby+%28Buff+%2F+Tan+%2F+Fawn%29,Tabby+%28Gray+%2F+Blue+%2F+Silver%29,Tabby+%28Leopard+%2F+Spotted%29,Tabby+%28Orange+%2F+Red%29,Tabby+%28Tiger+Striped%29,Torbie";
    } else if (likeCounts.color.tabby === currentMax) {
      colorQuery +=
        "&color=Tabby+%28Brown+%2F+Chocolate%29,Tabby+%28Buff+%2F+Tan+%2F+Fawn%29,Tabby+%28Gray+%2F+Blue+%2F+Silver%29,Tabby+%28Leopard+%2F+Spotted%29,Tabby+%28Orange+%2F+Red%29,Tabby+%28Tiger+Striped%29,Torbie";
    }
    //siamese
    if (likeCounts.color.siamese > currentMax) {
      currentMax = likeCounts.color.siamese;
      colorQuery = "&breed=Siamese,Applehead+Siamese,Balinese";
    } else if (likeCounts.color.siamese === currentMax) {
      colorQuery += "&breed=Siamese,Applehead+Siamese,Balinese";
    }
    //persian
    if (likeCounts.color.persian > currentMax) {
      currentMax = likeCounts.color.persian;
      colorQuery = "&breed=Persian,Himalayan";
    } else if (likeCounts.color.persian === currentMax) {
      colorQuery += "&breed=Persian,Himalayan";
    }

    var locationQuery = "";
    locationQuery += "&location=" + lat + "," + lng;
    locationQuery += "&distance=500"; //max allowed distance
    locationQuery += "&sort=distance"; //return closest results

    var queryParameters =
      "?type=cat&status=adoptable" +
      colorQuery +
      ageQuery +
      coatQuery +
      locationQuery +
      "&limit=25";

    console.log("Query Parameters: " + queryParameters);

    $.ajax({
      url: queryURL + queryParameters,
      method: "GET",
      headers: {
        Authorization: requestHeader
      }
    }).then(function (response) {
      console.log("Cat search success: " + response.animals);
      buildPetSelectPage(response);
    });
  });
}

//build the pet select page
function buildPetSelectPage(response) {
  $("#main-content").empty();

  var containerDiv = $("<div>");
  containerDiv.attr("class", "container");
  $("#main-content").append(containerDiv);

  var rowDiv = $("<div>");
  rowDiv.attr("class", "row");
  containerDiv.append(rowDiv);

  var colDiv = $("<div>");
  colDiv.attr("class", "col text-center catalogue-height");
  rowDiv.append(colDiv);

  var selectHeaderEl = $("<h3>");
  selectHeaderEl.attr("class", "page-header");
  selectHeaderEl.text("You have been matched with local, adoptable cats!");
  colDiv.append(selectHeaderEl);

  var petDisplayDiv = $("<div>");
  petDisplayDiv.attr(
    "class",
    "d-flex flex-wrap justify-content-center align-items-stretch"
  );
  petDisplayDiv.attr("id", "petfinder-display");
  colDiv.append(petDisplayDiv);

  var builtCount = 0;
  var streetAdd = "";
  for (var i = 0; i < response.animals.length && builtCount < 5; i++) {
    streetAdd = response.animals[i].contact.address.address1;

    if (streetAdd !== null) {
      if (
        streetAdd.search("PO B") === -1 &&
        streetAdd.search("P.O.") === -1 &&
        streetAdd.search("@") === -1
      ) {
        petDisplayDiv.append(buildPetResultDiv(response.animals[i]));
        builtCount++;
      }
    }
  }
}

//build and return a jQuery object to match the .pet-result divs in cat-select.html
function buildPetResultDiv(cat) {
  var petResultDiv = $("<div>");
  petResultDiv.attr("class", "pet-result");

  var resultImageDiv = $("<div>");
  resultImageDiv.attr("class", "pet-result-img");
  if (cat.photos[0] != undefined) {
    resultImageDiv.css(
      "background-image",
      "url('" + cat.photos[0].large + "')"
    );
  }
  petResultDiv.append(resultImageDiv);

  var headerEl = $("<h4>");
  headerEl.attr("class", "pet-result-name");
  headerEl.text(cat.name);
  petResultDiv.append(headerEl);

  var pPetEl = $("<p>");
  petResultDiv.append(pPetEl);

  var ageSpan = $("<span>");
  ageSpan.attr("class", "pet-result-age");
  ageSpan.text(cat.age);
  pPetEl.append(ageSpan);
  pPetEl.append("&nbsp;");

  var genderSpan = $("<span>");
  genderSpan.attr("class", "pet-result-gender");
  genderSpan.text(cat.gender);
  pPetEl.append(genderSpan);
  pPetEl.append("&nbsp;");

  var breedSpan = $("<span>");
  breedSpan.attr("class", "pet-result-breed");
  var breedStr = cat.breeds.primary;
  if (cat.breeds.secondary !== null) {
    breedStr += " / " + cat.breeds.secondary;
  }
  breedSpan.text(breedStr);
  pPetEl.append(breedSpan);

  var pAddressEl = $("<p>");
  pAddressEl.attr("class", "shelter-address");
  var streetAdd = cat.contact.address.address1;
  var cityAdd = cat.contact.address.city;
  var stateAdd = cat.contact.address.state;
  var zipAdd = cat.contact.address.postcode;
  pAddressEl.text(streetAdd + ", " + cityAdd + ", " + stateAdd + " " + zipAdd);
  petResultDiv.append(pAddressEl);

  var mapButton = $("<button>");
  mapButton.attr("class", "mapItBtn");
  mapButton.text("Map It!");
  petResultDiv.append(mapButton);

  return petResultDiv;
}

$(document).on("click", ".mapItBtn", function (event) {
  var finalAddress = $(event.target).prev().text();

  var URLpass =
    "map.html?address=" +
    finalAddress +
    "&longitude=" +
    Latlong.longitude +
    "&latitude=" +
    Latlong.latitude;

  window.open(URLpass, "_blank");
});
