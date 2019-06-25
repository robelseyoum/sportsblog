const express = require("express");
const router = express.Router();

//import the category model
const Category = require("../models/Category.js");
//import the artile model
const Article = require("../models/article.js");

router.get("/", (req, res, next) => {
  res.render("articles", { title: "Articles" });
});

router.get("/show/:id", (req, res, next) => {
  res.render("article", { title: "Article" });
});

router.get("/category/:category_id", (req, res, next) => {
  res.render("article", { title: "Category Articles" });
});

//post request to add Article
router.post("/add", (req, res, next) => {
  req.checkBody("title", "Title is required").notEmpty();
  req.checkBody("author", "Author is required").notEmpty();
  req.checkBody("category", "Category is required").notEmpty();
  req.checkBody("body", "Body is required").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    Category.getCategories((err, categories) => {
      res.render("add_article", {
        errors: errors,
        title: "Create Article",
        categories: categories
      });
    });
  } else {
    let acrticle = new Article();
    acrticle.title = req.body.title;
    acrticle.subtitle = req.body.subtitle;
    acrticle.category = req.body.category;
    acrticle.author = req.body.author;
    acrticle.body = req.body.body;

    Article.addArticle(acrticle, (err, acrticle) => {
      if (err) {
        res.send(err);
      }
      req.flash("success", "Article saved");

      res.redirect("/manage/articles");
    });
  }
});

// Edit Article - POST
router.post("/edit/:id", (req, res, next) => {
  req.checkBody("title", "Title is required").notEmpty();
  req.checkBody("author", "Author is required").notEmpty();
  req.checkBody("category", "Category is required").notEmpty();
  req.checkBody("body", "Body is required").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    Category.getCategories((err, categories) => {
      res.render("edit_article", {
        errors: errors,
        title: "Edit Article",
        categories: categories
      });
    });
  } else {
    let acrticle = new Article();

    const query = { _id: req.params.id };
    const update = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      category: req.body.category,
      author: req.body.author,
      body: req.body.body
    };

    Article.updateArticle(query, update, {}, (err, article) => {
      if (err) {
        res.send(err);
      }
      req.flash("success", "Article updated");
      res.redirect("/manage/articles");
    });
  }
});

//Delete articles - DELETE

router.delete("/delete/:id", (req, res, next) => {
  const query = { _id: req.params.id };

  Article.removeArticle(query, (err, category) => {
    if (err) {
      res.send(err);
    }
    res.status(200);
  });
});

module.exports = router;
