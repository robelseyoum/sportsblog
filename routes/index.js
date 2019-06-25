const express = require("express");
const router = express.Router();

//import the artile model
const Article = require("../models/article.js");

router.get("/", (req, res, next) => {
  Article.getArticles((err, articles) => {
    res.render("index", {
      title: "index",
      articles: articles
    });
  }, 3);
});

module.exports = router;
