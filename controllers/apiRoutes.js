const axios = require("axios");
const db = require("../models");
const express = require("express");
const app = express();
const cheerio = require("cheerio");

  app.get("/scrape", function(req, res) {
    axios.get("http://www.npr.org").then(function(response) {
      let $ = cheerio.load(response.data);
      $(".story-wrap").each(function(i, element) {
        let result = {};

        result.title = $(this)
          .children(".story-text")
          .children("a")
          .children(".title")
          .text();
        result.link = $(this)
          .children(".story-text")
          .children("a")
          .attr("href");
        result.summary = $(this)
          .children(".story-text")
          .children("a")
          .children("p")
          .text();
        result.image = $(this)
          .children("figure")
          .children("div")
          .children("div")
          .children("a")
          .children("img")
          .attr("src");

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

  app.get("/articles/savedArticles", function(req, res){
    db.Article.find({
      saved: true
    })
    .then(function(dbSavedArticles){
      res.json(dbSavedArticles);
    })
  });
  
  app.get("/articles", function(req, res) {
    db.Article.find({
      saved: false
    })
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

  app.delete("/articles/deleteOne/:id", function(req, res){
    db.Article.findByIdAndDelete({_id: req.params.id})
    .then(function(deleted){
      res.json(deleted);
    })
    .catch(function(err){
      res.json(err);
    })
  })

module.exports = app;