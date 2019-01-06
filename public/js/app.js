
// Grab the articles as a json
$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    cssID = `#${data[i]._id}`
    $("#articles").append("<div class='media' id='"+ data[i]._id + "'>")
    $(cssID).append("<img src='" + data[i].image + "' class='mr-3' alt='" + data[i].title + "'>");
    $(cssID).append("<div class='media-body'><h5><a href='" + data[i].link + "'>" + data[i].title + "</a></h5>" + data[i].summary + "</div>");
    $(cssID).append("<br><button id='note' data-id='" + data[i]._id + "'>NOTE</buttton><br>");
    $(cssID).append("<br><button id='deleteOne' data-id='" + data[i]._id + "'>DELETE</buttton><br>");
    $("#articles").append("<br>");
  }
});

$(document).on("click", "#scraper", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function(jsonResponseLocation){
    window.location.replace(jsonResponseLocation);
  })
});

// DYNAMICALLY LOAD SAVED ARTICLES
$(document).on("click", "#savedArticles", function() {
  $.ajax({
    method: "GET",
    url: "/articles/savedArticles"
  }).then(function(data){
    $("#articles").empty();
    for (var i = 0; i < data.length; i++) {
      cssID = `#${data[i]._id}`
      $("#articles").append("<div class='card' id='"+ data[i]._id + "'></div>")
      $(cssID).append("<a href='" + data[i].link + "'>      " + data[i].title + "</a><br>");
      $(cssID).append("<p>" + data[i].summary + "</p>");
      $(cssID).append("<br><button id='note' data-id='" + data[i]._id + "'>NOTE</buttton><br>");
      $(cssID).append("<br><button id='deleteOne' data-id='" + data[i]._id + "'>DELETE</buttton><br>");
      $("#articles").append("<br>");
    }
  })
});

// DELETE ONE
$(document).on("click", "#deleteOne", function() {
  var thisID = $(this).attr("data-id")
  var cssID = `#${thisID}`
  $.ajax({
    method: "delete",
    url: "/articles/deleteOne/" + thisID
  }).then(function(deleteOne){
    console.log(deleteOne)
    $(cssID).empty()
    // delete article from database. the button has the data ID
    // clear this specific article from tthe HTML
    // assign a div for each article, give it a data ID as a CSS ID, delete DIV ID?
    // $("#DATAIDWHATEVERITIS").val("DELETED");
    $(cssID).text("DELETED")
  })
});




$(document).on("click", "#note", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  }).then(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});
