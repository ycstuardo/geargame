const express = require("express");
const router = express.Router();
const pool = require("../../database");

// GET all products
router.get("/products", async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");
    res.json(products.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET a single product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    if (product.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// CREATE a new product
router.post("/product", async (req, res) => {
  try {
    const {
      productName,
      price,
      stock,
      description,
      image,
      id_brand,
      id_category,
    } = req.body;
    const newProduct = await pool.query(
      "INSERT INTO products (productName, price, stock, description, image, id_brand, id_category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [productName, price, stock, description, image, id_brand, id_category]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE a product by ID
router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productName,
      price,
      stock,
      description,
      image,
      id_brand,
      id_category,
    } = req.body;
    const updatedProduct = await pool.query(
      "UPDATE products SET productName = $1, price = $2, stock = $3, description = $4, image = $5, id_brand = $6, id_category = $7 WHERE id = $8 RETURNING *",
      [productName, price, stock, description, image, id_brand, id_category, id]
    );
    if (updatedProduct.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE a product by ID
router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    if (deletedProduct.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
