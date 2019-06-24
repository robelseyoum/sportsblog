const express = require("express");
const router = express.Router();

//list of articles
router.get("/articles", (req, res, next) => {
  res.render("manage_articles", { title: "Manage Articles" });
});

//to add articles
router.get("/article/add", (req, res, next) => {
  res.render("add_article", { title: "Create Article" });
});

//to edit articles
router.get("/articles/edit/:id", (req, res, next) => {
  res.render("edit_article", { title: "Edit Article" });
});

//list of categories
router.get("/categories", (req, res, next) => {
  res.render("manage_categories", { title: "Manage Categories" });
});

//to add categories
router.get("/categories/add", (req, res, next) => {
  res.render("add_category", { title: "Create Category" });
});

//to edit categores
router.get("/categories/edit/:id", (req, res, next) => {
  res.render("edit_category", { title: "Edit Category" });
});

module.exports = router;
