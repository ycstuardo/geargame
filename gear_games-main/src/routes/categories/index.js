const express = require("express");
const router = express.Router();
const pool = require("../../database");

// CREATE category
router.post("/category", async (req, res) => {
  try {
    const { categoryName } = req.body;
    const newCategory = await pool.query(
      "INSERT INTO categories (categoryName) VALUES ($1) RETURNING *",
      [categoryName]
    );
    res.json(newCategory.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// READ all categories
router.get("/categories", async (req, res) => {
  try {
    const allCategories = await pool.query("SELECT * FROM categories");
    res.json(allCategories.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// READ single category
router.get("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [id]
    );
    if (category.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// UPDATE category
router.put("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    const updatedCategory = await pool.query(
      "UPDATE categories SET categoryName = $1 WHERE id = $2 RETURNING *",
      [categoryName, id]
    );
    if (updatedCategory.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE category
router.delete("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [id]
    );
    if (deletedCategory.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
