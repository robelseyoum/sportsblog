const express = require("express");
const router = express.Router();

const Category = require("../models/Category.js");
const Article = require("../models/article.js");

//list of articles
router.get("/articles", (req, res, next) => {
  Article.getArticles((err, articles) => {
    //console.log(categories);
    if (err) {
      res.send(err);
    }
    res.render("manage_articles", {
      title: "Manage Articles",
      articles: articles
    });
  });
});

//to add articles
router.get("/article/add", (req, res, next) => {
  //Fetch the category to use as a dropdown button
  Category.getCategories((err, categories) => {
    if (err) {
      res.send(err);
    }

    res.render("add_article", {
      title: "Create Article",
      categories: categories
    });
  });
});

//to edit articles
router.get("/articles/edit/:id", (req, res, next) => {
  Article.getArticleById(req.params.id, (err, article) => {
    if (err) {
      res.send(err);
    }
    Category.getCategories((err, categories) => {
      res.render("edit_article", {
        title: "Edit Article",
        article: article,
        categories: categories
      });
    });
  });
});

/* ****************************************************************** */

//list of categories
router.get("/categories", (req, res, next) => {
  Category.getCategories((err, categories) => {
    //console.log(categories);
    if (err) {
      res.send(err);
    }
    res.render("manage_categories", {
      title: "Categories",
      categories: categories
    });
  });

  //res.render("manage_categories", { title: "Manage Categories" });
});

//to add categories
router.get("/categories/add", (req, res, next) => {
  res.render("add_category", { title: "Create Category" });
});

//to edit categores
router.get("/categories/edit/:id", (req, res, next) => {
  Category.getCategoryById(req.params.id, (err, category) => {
    if (err) {
      res.send(err);
    }
    res.render("edit_category", {
      title: "Edit Category",
      category: category
    });
  });
});

module.exports = router;
