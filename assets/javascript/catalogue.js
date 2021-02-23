// queue of cats to be displayed
let displayQueue = [];

// currently displayed cat
let cat;

// count of how many times the queue function has been called
let queueCalled = 0;

//these vars track how many photos have been "liked" that have the corresponding attribute
let coatShortLiked = 0;
let coatLongLiked = 0;

let ageKittenLiked = 0;
let ageAdultLiked = 0;

let colorOrangeLiked = 0;
let colorBlackLiked = 0;
let colorGrayLiked = 0;
let colorWhiteLiked = 0;
let colorCalicoLiked = 0;
let colorTabbyLiked = 0;
let colorSiameseLiked = 0;
let colorPersianLiked = 0;

//these vars track how many photos have been shown that have the corresponding attribute
let coatShortShown = 0;
let coatLongShown = 0;

let ageKittenShown = 0;
let ageAdultShown = 0;

let colorOrangeShown = 0;
let colorBlackShown = 0;
let colorGrayShown = 0;
let colorWhiteShown = 0;
let colorCalicoShown = 0;
let colorTabbyShown = 0;
let colorSiameseShown = 0;
let colorPersianShown = 0;

// Create a variable in which to temporarily store the cat library so that it can be safely modified
let tempCatArray;

//click event listeners
$(document).on("click", "#likeButton", likeHandler);
$(document).on("click", "#dislikeButton", dislikeHandler);

// randomizes the passed array using the Fisher Yates method
const randomize = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

// calls appropriate function to add cats to the queue
function handleEmptyQueue() {
  // want to show first 16 cats using the queueStandardBlock func to select cats from library
  if (queueCalled === 0) {
    queueCalled++;
    queueStandardBlock();
    advance();
  }
  // after the first 16, select additional cats based on user responses using queueRelevantBlock func
  else if (queueCalled === 1) {
    queueCalled++;
    queueRelevantBlock();
    advance();
  }
  else {
    getGeolocation();
  }
}

// adds a block of semi-random cats to the queue - one of each color
function queueStandardBlock() {
  // create an array with each color index
  let colorInd = [];
  for (let i = 0; i < catLibrary.length; i++) {
    colorInd.push(i);
  }
  // randomize color order
  randomize(colorInd);
  // select two cats of each color
  let newBlock = [];
  colorInd.forEach( (color, index) => {
    let catInd;
    let cat;
    if (index % 2 === 0) {  // half the colors will show long coat kitten and short coat adult
      catInd = Math.floor(Math.random() * catLibrary[color][0][0].length);
      cat = catLibrary[color][0][0].splice(catInd, 1);
      newBlock.push(cat[0]);
      catInd = Math.floor(Math.random() * catLibrary[color][1][1].length);
      cat = catLibrary[color][1][1].splice(catInd, 1);
      newBlock.push(cat[0]);
    }
    else {  // other half of colors will show short coat kitten and long coat adult
      catInd = Math.floor(Math.random() * catLibrary[color][0][1].length);
      cat = catLibrary[color][0][1].splice(catInd, 1);
      newBlock.push(cat[0]);
      catInd = Math.floor(Math.random() * catLibrary[color][1][0].length);
      cat = catLibrary[color][1][0].splice(catInd, 1);
      newBlock.push(cat[0]);
    }
  });
  // randomize cat list so that cats aren't presented in an apparent age / coat length pattern
  randomize(newBlock);
  console.log("Here's the selected cats");
  console.log(newBlock);
  // add new block to end of displayQueue
  displayQueue.push(...newBlock);
}

// adds cats from categories the user has liked to the queue
function queueRelevantBlock() {
  console.log("We're in the queueRelevantBlock function!");
}

//handler for like button click or swipe right
function likeHandler() {
  //increment counts for attributes of current image
  switch (cat.age) {
    case "Adult":
      ageAdultLiked++;
      ageAdultShown++;
      break;

    case "Kitten":
      ageKittenLiked++;
      ageKittenShown++;
      break;

    default:
      console.log("Unexpected Age Value Encountered by Like Button Listener");
  }

  switch (cat.coat) {
    case "Short Hair":
      coatShortLiked++;
      coatShortShown++;
      break;

    case "Long Hair":
      coatLongLiked++;
      coatLongShown++;
      break;

    default:
      console.log("Unexpected Coat Value Encountered by Like Button Listener");
  }

  // switch (randomStockCatBreed) {
  //   case "Siamese":
  //     colorSiameseLiked++;
  //     colorSiameseShown++;
  //     break;

  //   case "Persian":
  //     colorPersianLiked++;
  //     colorPersianShown++;
  //     break;

  //   case undefined:
  //     break;

  //   default:
  //     console.log("Unexpected Breed Value Encountered by Like Button Listener");
  // }

  switch (cat.color) {
    case "Orange":
      colorOrangeLiked++;
      colorOrangeShown++;
      break;

    case "Black":
      colorBlackLiked++;
      colorBlackShown++;
      break;

    case "Gray":
      colorGrayLiked++;
      colorGrayShown++;
      break;

    case "White":
      colorWhiteLiked++;
      colorWhiteShown++;
      break;

    case "Calico":
      colorCalicoLiked++;
      colorCalicoShown++;
      break;

    case "Tabby":
      colorTabbyLiked++;
      colorTabbyShown++;
      break;

    case "Siamese":
      colorSiameseLiked++;
      colorSiameseShown++;
      break;

    case "Persian":
      colorPersianLiked++;
      colorPersianShown++;
      break;

    default:
      console.log("Unexpected Color Value Encountered by Like Button Listener");
  }

  advance();
}

//handler for dislike button click or swipe left
function dislikeHandler() {
  //capture attributes of current image and store in variables
  //increment appropriate global attribute count tracking variables
  if (cat.color === "Orange") {
    colorOrangeShown++;
  }
  if (cat.color === "Black") {
    colorBlackShown++;
  }

  if (cat.color === "Gray") {
    colorGrayShown++;
  }

  if (cat.color === "White") {
    colorWhiteShown++;
  }

  if (cat.color === "Calico") {
    colorCalicoShown++;
  }

  if (cat.color === "Tabby") {
    colorTabbyShown++;
  }

  if (cat.color === "Siamese") {
    colorSiameseShown++;
  }

  if (cat.color === "Persian") {
    colorPersianShown++;
  }

  if (cat.age === "Kitten") {
    ageKittenShown++;
  }

  if (cat.age === "Adult") {
    ageAdultShown++;
  }

  if (cat.coat === "Short Hair") {
    coatShortShown++;
  }

  if (cat.coat === "Long Hair") {
    coatLongShown++;
  }

  advance();
}

//evaluates the data we've gathered so far and returns true if we have enough data to move on to cat select, false if not
function haveEnoughData() {
  if (
    (coatShortLiked >= 2 || coatLongLiked >= 2) &&
    (ageKittenLiked >= 2 || ageAdultLiked >= 2) &&
    (colorOrangeLiked >= 2 ||
      colorBlackLiked >= 2 ||
      colorGrayLiked >= 2 ||
      colorWhiteLiked >= 2 ||
      colorCalicoLiked >= 2 ||
      colorTabbyLiked >= 2 ||
      colorSiameseLiked >= 2 ||
      colorPersianLiked >= 2)
  ) {
    return true;
  } else {
    return false;
  }
}

//build an algorithm to select a next photo based on what attributes we need more data for.
//passes the cat to displayPhoto to update the DOM
function getNextPhoto() {
  // If we have run out of cats to show, show an error message in a modal
  if (tempCatArray.length === 0) {
    // Clear the main content div
    $("#main-content-div").empty();
    // Create error modal div
    let newErrorModal = $("<div>");
    newErrorModal.addClass("error-modal");
    // Add text to error modal
    newErrorModal.append(
      $("<p>").text(
        "We noticed that you haven't liked many cat photos. Are you really sure you want to adopt a cat?"
      )
    );
    newErrorModal.append(
      $("<p>").text(
        "Please try again, and next time, use the thumbs-up button more! We need to know what you like in order to match you with shelter cats."
      )
    );
    // Add button to error modal that will refresh the page on click
    let refreshButton = $("<button>");
    refreshButton.addClass("refresh-button");
    refreshButton.text("Try Again");
    refreshButton.on("click", function() {
      location.reload(true);
    });
    newErrorModal.append(refreshButton);
    // Append error modal to page
    newErrorModal.appendTo($("#main-content-div"));
    return;
  }
  // Randomly select a cat from the remaining stock cats in the temporary catLibrary
  randomNum = Math.floor(Math.random() * tempCatArray.length);
  randomStockCat = tempCatArray[randomNum];
  // Test the randomly selected cat to make sure it matches the attributes we need more data for
  if (
    coatShortShown + 1 < coatLongShown &&
    randomStockCat.coat === "Long Hair"
  ) {
    // If the randomly selected cat has long hair and we need to show more short haired cats, then randomly select a different cat and temporarily remove the selected cat from the library of cats
    tempCatArray.splice(randomNum, 1);
    return getNextPhoto();
  }
  if (
    coatLongShown + 1 < coatShortShown &&
    randomStockCat.coat === "Short Hair"
  ) {
    // If the randomly selected cat has short hair and we need to show more long haired cats, then randomly select a different cat and temporarily remove the selected cat from the library of cats
    tempCatArray.splice(randomNum, 1);
    return getNextPhoto();
  }
  if (ageKittenShown + 1 < ageAdultShown && randomStockCat.age === "Adult") {
    // If the randomly selected cat is an adult and we need to show more kittens, then randomly select a different cat and temporarily remove the selected cat from the library of cats
    tempCatArray.splice(randomNum, 1);
    return getNextPhoto();
  }
  if (ageAdultShown + 1 < ageKittenShown && randomStockCat.age === "Kitten") {
    // If the randomly selected cat is a kitten and we need to show more adults, then randomly select a different cat and temporarily remove the selected cat from the library of cats
    tempCatArray.splice(randomNum, 1);
    return getNextPhoto();
  }
  if (
    randomStockCat.color === "Orange" &&
    (colorBlackShown + 1 < colorOrangeShown ||
      colorGrayShown + 1 < colorOrangeShown ||
      colorWhiteShown + 1 < colorOrangeShown ||
      colorCalicoShown + 1 < colorOrangeShown ||
      colorTabbyShown + 1 < colorOrangeShown ||
      colorSiameseShown + 1 < colorOrangeShown ||
      colorPersianShown + 1 < colorOrangeShown)
  ) {
    // If the randomly selected cat is orange and we have shown too many orange cats, then randomly select a different cat and temporarily remove the selected cat from the library of cats
    tempCatArray.splice(randomNum, 1);
    return getNextPhoto();
  }
  if (
    randomStockCat.color === "Black" &&
    (colorOrangeShown + 1 < colorBlackShown ||
      colorGrayShown + 1 < colorBlackShown ||
      colorWhiteShown + 1 < colorBlackShown ||
      colorCalicoShown + 1 < colorBlackShown ||
      colorTabbyShown + 1 < colorBlackShown ||
      colorSiameseShown + 1 < colorBlackShown ||
      colorPersianShown + 1 < colorBlackShown)
  ) {
    // If the randomly selected cat is black and we have shown too many black cats, then randomly select a different cat and temporarily remove the selected cat from the library of cats
    tempCatArray.splice(randomNum, 1);
    return getNextPhoto();
  }
  if (
    randomStockCat.color === "Gray" &&
    (colorOrangeShown + 1 < colorGrayShown ||
      colorBlackShown + 1 < colorGrayShown ||
      colorWhiteShown + 1 < colorGrayShown ||
      colorCalicoShown + 1 < colorGrayShown ||
      colorTabbyShown + 1 < colorGrayShown ||
      colorSiameseShown + 1 < colorGrayShown ||
      colorPersianShown + 1 < colorGrayShown)
  ) {
    // If the randomly selected cat is gray and we have shown too many gray cats, then randomly select a different cat and temporarily remove the selected cat from the library of cats
    tempCatArray.splice(randomNum, 1);
    return getNextPhoto();
  }
  if (
    randomStockCat.color === "White" &&
    (colorOrangeShown + 1 < colorWhiteShown ||
      colorBlackShown + 1 < colorWhiteShown ||
      colorGrayShown + 1 < colorWhiteShown ||
      colorCalicoShown + 1 < colorWhiteShown ||
      colorTabbyShown + 1 < colorWhiteShown ||
      colorSiameseShown + 1 < colorWhiteShown ||
      colorPersianShown + 1 < colorWhiteShown)
  ) {
    // If the randomly selected cat is white and we have shown too many white cats, then randomly select a different cat and temporarily remove the selected cat from the library of cats
    tempCatArray.splice(randomNum, 1);
    return getNextPhoto();
  }
  if (
    randomStockCat.color === "Calico" &&
    (colorOrangeShown + 1 < colorCalicoShown ||
      colorBlackShown + 1 < colorCalicoShown ||
      colorGrayShown + 1 < colorCalicoShown ||
      colorWhiteShown + 1 < colorCalicoShown ||
      colorTabbyShown + 1 < colorCalicoShown ||
      colorSiameseShown + 1 < colorCalicoShown ||
      colorPersianShown + 1 < colorCalicoShown)
  ) {
    // If the randomly selected cat is calico and we have shown too many calico cats, then randomly select a different cat and temporarily remove the selected cat from the library of cats
    tempCatArray.splice(randomNum, 1);
    return getNextPhoto();
  }
  if (
    randomStockCat.color === "Tabby" &&
    (colorOrangeShown + 1 < colorTabbyShown ||
      colorBlackShown + 1 < colorTabbyShown ||
      colorGrayShown + 1 < colorTabbyShown ||
      colorWhiteShown + 1 < colorTabbyShown ||
      colorCalicoShown + 1 < colorTabbyShown ||
      colorSiameseShown + 1 < colorTabbyShown ||
      colorPersianShown + 1 < colorTabbyShown)
  ) {
    // If the randomly selected cat is tabby and we have shown too many tabby cats, then randomly select a different cat and temporarily remove the selected cat from the library of cats
    tempCatArray.splice(randomNum, 1);
    return getNextPhoto();
  }
  if (
    randomStockCat.breed === "Siamese" &&
    (colorOrangeShown + 1 < colorSiameseShown ||
      colorBlackShown + 1 < colorSiameseShown ||
      colorGrayShown + 1 < colorSiameseShown ||
      colorWhiteShown + 1 < colorSiameseShown ||
      colorCalicoShown + 1 < colorSiameseShown ||
      colorTabbyShown + 1 < colorSiameseShown ||
      colorPersianShown + 1 < colorSiameseShown)
  ) {
    // If the randomly selected cat is siamese and we have shown too many siamese cats, then randomly select a different cat and temporarily remove the selected cat from the library of cats
    tempCatArray.splice(randomNum, 1);
    return getNextPhoto();
  }
  if (
    randomStockCat.breed === "Persian" &&
    (colorOrangeShown + 1 < colorPersianShown ||
      colorBlackShown + 1 < colorPersianShown ||
      colorGrayShown + 1 < colorPersianShown ||
      colorWhiteShown + 1 < colorPersianShown ||
      colorCalicoShown + 1 < colorPersianShown ||
      colorTabbyShown + 1 < colorPersianShown ||
      colorSiameseShown + 1 < colorPersianShown)
  ) {
    // If the randomly selected cat is persian and we have shown too many persian cats, then randomly select a different cat and temporarily remove the selected cat from the library of cats
    tempCatArray.splice(randomNum, 1);
    return getNextPhoto();
  }
  // If the randomly selected cat passes all of the above criteria, update the photo and save cat attribute variables
  displayPhoto(randomStockCat);
}

function advance() {  
  // Queue up some cats if queue is empty
  if (displayQueue.length === 0) {
    handleEmptyQueue();
  }
  else {
    // display next cat in queue
    cat = displayQueue.shift();
    displayPhoto();
  }
}

//updates DOM, replacing old photo with new photo passed to the function, and saving variables for the cat attributes
function displayPhoto() {
  // Clear the main content div
  $("#main-content-div").empty();
  // Append a div with id="catPhoto" and set that div's background image
  $("#main-content-div").append($('<div id="catPhoto"></div>'));
  $("#catPhoto").css("background-image", "url(" + cat.image + ")");
  //listen for swipes on photo and bind to handler functions
  $("#catPhoto")
    .hammer()
    .bind("swipeleft", dislikeHandler);
  $("#catPhoto")
    .hammer()
    .bind("swiperight", likeHandler);
  // Append like/dislike buttons
  $("#main-content-div").append(
    $(`<button class="thumb-button" id="likeButton">
  <i class="far fa-thumbs-up fa-2x"></i>
</button>
<button class="thumb-button" id="dislikeButton">
  <i class="far fa-thumbs-down fa-2x"></i>
</button>`)
  );
}
