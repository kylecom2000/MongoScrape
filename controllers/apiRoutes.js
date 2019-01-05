const axios = require("axios");
const db = require("../models");
const express = require("express");
const app = express();
const cheerio = require("cheerio");

  app.get("/scrape", function(req, res) {
    axios.get("http://www.npr.org").then(function(response) {
      let $ = cheerio.load(response.data);
      $(".story-text").each(function(i, element) {
        let result = {};

        result.title = $(this)
          .children("a")
          .children("h3")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
        result.summary = $(this)
          .children("a")
          .children("p")
          .text();

        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
      res.json("/");
    });
  });
  
  app.get("/articles", function(req, res) {
    db.Article.find({})
    .then(function(dbArticles){
      res.json(dbArticles);
    })
  });
  
  app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id})
    .populate("note")
    .then(function(dbArticles){
      res.json(dbArticles)
    })
  });
  
  app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findByIdAndUpdate(req.params.id, { note: dbNote._id });
      })
      .then(function(dbArticle){
        res.json(dbArticle);
      })
      .catch(function(err){
        res.json(err);
      })
  });

  app.delete("/articles/delete", function(req, res){
    
  })

module.exports = app;