$(document).ready(function() {
  // Create click event for about header
  $("#about-header").on("click", function() {
    // Un-hide about text
    $("#about-hide").show();
    // Hide main content
    $("#main-content").hide();
  });

  // Create click event for about exit
  $("#about-exit").on("click", function() {
    // Hide about text
    $("#about-hide").hide();
    // Un-hide main content
    $("#main-content").show();
  });

  //queue first block of cats on page load
  queueCats();
});
