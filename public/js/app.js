
// Grab the articles json and append each item to html.
$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    cssID = `#${data[i]._id}`
    $("#articles").append("<div class='media' id='"+ data[i]._id + "'></div>")
    $(cssID).append("<img src='" + data[i].image + "' class='mr-3' alt='" + data[i].title + "'>");
    $(cssID).append("<div class='media-body'><h5><a href='" + data[i].link + "'>" + data[i].title + "</a></h5>" + data[i].summary + "</div>");
    $(cssID).append("<button type='button' class='btn btn-warning' id='note' data-toggle='modal data-target='#notesModal' data-id='" + data[i]._id + "'>NOTE</buttton>");
    $(cssID).append("<button type='button' class='btn btn-success' id='saveArticle' data-id='" + data[i]._id + "'>SAVE</buttton>");
  }
});

// NPR.org
$(document).on("click", "#nprORG", function(){
  window.location.replace("http://www.npr.org")
})

// SCRAPE
$(document).on("click", "#scraper", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function(jsonResponseLocation){
    window.location.replace(jsonResponseLocation);
  })
});

// DYNAMICALLY LOAD SAVED ARTICLES
$(document).on("click", "#savedArticlesBtn", function() {
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
      $(cssID).append("<button type='button' class='btn btn-warning' id='note' data-toggle='modal data-target='#notesModal' data-id='" + data[i]._id + "'>NOTE</buttton>");
      $(cssID).append("<button type='button' class='btn btn-secondary' id='deleteOne' data-id='" + data[i]._id + "'>DELETE</buttton>");
      // $("#articles").append("<br>");
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
    $(cssID).text("SAVED");
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
  $("#notesModalLabel").val("");
  $("#titleinput").val("");
  $("#bodyinput").val("");
  $('#notesModal').modal('toggle')
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {
      console.log(data);
      $("#notesModalLabel").text(data.title);
      $("#deleteNote").attr("data-id", data._id);
      $("#savenote").attr("data-id", data._id);
      
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

// Save/update note to database.
$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/notes/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  }).then(function(data) {
      console.log(data);
    });
});

// Delete note
$(document).on("click", "#deleteNote", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/notes/" + thisId
  })
  .then(function(data){
    console.log(data)
  })
});