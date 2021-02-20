// declare variables
const aboutSection = $("#about-section");
const mainContentHeight = $(".main-content-height");
let randomNum;
let randomStockCat;
let randomStockCatAge;
let randomStockCatCoat;
let randomStockCatColor;
let randomStockCatImage;

// When user clicks the "Show me cats!" button...
$("#startButton").on("click", function() {
  // Hide the about section
  aboutSection.hide();
  // Adjust height of main content section
  mainContentHeight.css("min-height", "calc(100vh - 58px - 4px - 58px)");
  // Adjust flex style of col div
  $("#main-content-div").removeClass(
    "d-flex justify-content-center align-items-center"
  );
  $("#main-content-div").addClass("text-center");

  // Proceed to cats...
  advance();
});
