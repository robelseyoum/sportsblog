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

module.exports = router;
