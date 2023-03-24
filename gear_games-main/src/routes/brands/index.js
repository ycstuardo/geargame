const express = require("express");
const pool = require("../../database");
const router = express.Router();

// CREATE brand
router.post("/brand", async (req, res) => {
  try {
    const { brandName } = req.body;
    const newBrand = await pool.query(
      "INSERT INTO brands (brandName) VALUES ($1) RETURNING *",
      [brandName]
    );
    res.json(newBrand.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// READ all brands
router.get("/brands", async (req, res) => {
  try {
    const allBrands = await pool.query("SELECT * FROM brands");
    res.json(allBrands.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// READ single brand
router.get("/brand/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await pool.query("SELECT * FROM brands WHERE id = $1", [id]);
    if (brand.rows.length === 0) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json(brand.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// UPDATE brand
router.put("/brand/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { brandName } = req.body;
    const updatedBrand = await pool.query(
      "UPDATE brands SET brandName = $1 WHERE id = $2 RETURNING *",
      [brandName, id]
    );
    if (updatedBrand.rows.length === 0) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json(updatedBrand.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE brand
router.delete("/brand/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBrand = await pool.query(
      "DELETE FROM brands WHERE id = $1 RETURNING *",
      [id]
    );
    if (deletedBrand.rows.length === 0) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json({ message: "Brand deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
