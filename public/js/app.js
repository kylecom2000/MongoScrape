
// Grab the articles as a json
$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    cssID = `#${data[i]._id}`
    $("#articles").append("<div class='media' id='"+ data[i]._id + "'></div>")
    $(cssID).append("<img src='" + data[i].image + "' class='mr-3' alt='" + data[i].title + "'>");
    $(cssID).append("<div class='media-body'><h5><a href='" + data[i].link + "'>" + data[i].title + "</a></h5>" + data[i].summary + "</div>");
    $(cssID).append("<br><button type='button' class='btn btn-warning' id='note' data-id='" + data[i]._id + "'>NOTE</buttton><br>");
    $(cssID).append("<br><button type='button' class='btn btn-success' id='saveArticle' data-id='" + data[i]._id + "'>SAVE</buttton><br>");
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
      $("#articles").append("<div class='media' id='"+ data[i]._id + "'></div>")
      $(cssID).append("<img src='" + data[i].image + "' class='mr-3' alt='" + data[i].title + "'>");
      $(cssID).append("<div class='media-body'><h5><a href='" + data[i].link + "'>" + data[i].title + "</a></h5>" + data[i].summary + "</div>");
      $(cssID).append("<br><button type='button' class='btn btn-warning' id='note' data-id='" + data[i]._id + "'>NOTE</buttton><br>");
      $(cssID).append("<br><button type='button' class='btn btn-secondary' id='deleteOne' data-id='" + data[i]._id + "'>DELETE</buttton><br>");
      $("#articles").append("<br>");
    }
  })
});

// SAVE ARTICLES TO SAVED ARTICLES "PAGE"
$(document).on("click", "#saveArticle", function() {
  var thisID = $(this).attr("data-id")
  var cssID = `#${thisID}`
  $.ajax({
    method: "POST",
    url: "/articles/saveOneArticle/" + thisID
  }).then(function(savedOne){
    console.log(savedOne);
    $(cssID).empty();
    $(cssID).test("SAVED");
  })
})

// DELETE ONE ARTICLE
$(document).on("click", "#deleteOne", function() {
  var thisID = $(this).attr("data-id")
  var cssID = `#${thisID}`
  $.ajax({
    method: "DELETE",
    url: "/articles/deleteOne/" + thisID
  }).then(function(deleteOne){
    $(cssID).empty();
    $(cssID).text("DELETED");
  })
});

// DELETE ALL UNSAVED ARTICLES
  $(document).on("click", "#deleteAll", function() {
    $.ajax({
      method: "DELETE",
      url: "/articles/deleteAll"
    }).then(function(deleteAll){
      $("#articles").empty();
      $("#articles").text("DELETED");
    })
  });




// TODO - swithc this to somethign that floats above.
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
