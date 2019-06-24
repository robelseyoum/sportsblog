const express = require("express");
const router = express.Router();

//import the category model
Category = require("../models/Category.js");

//fetch the categories from db and spit into categories templates
router.get("/", (req, res, next) => {
  Category.getCategories((err, categories) => {
    //console.log(categories);
    if (err) {
      res.send(err);
    }
    res.render("categories", {
      title: "Categories",
      categories: categories
    });
  });
});

//handle post request from
//http://localhost:3000/manage/categories/add page
router.post("/add", (req, res, next) => {
  let category = new Category();
  category.title = req.body.title;
  category.description = req.body.description;

  Category.addCategory(category, (err, category) => {
    if (err) {
      res.send(err);
    }
    res.redirect("/manage/categories");
  });
});

module.exports = router;
