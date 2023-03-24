const express = require("express");
const router = express.Router();

// CREATE address
router.post("/addresses", async (req, res) => {
  try {
    const { street_name, street_number, user_id, city_id, commune_id } =
      req.body;
    const newAddress = await pool.query(
      "INSERT INTO addresses (street_name, street_number, user_id, city_id, commune_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [street_name, street_number, user_id, city_id, commune_id]
    );
    res.json(newAddress.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// READ all addresses
router.get("/addresses", async (req, res) => {
  try {
    const allAddresses = await pool.query("SELECT * FROM addresses");
    res.json(allAddresses.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// READ single address
router.get("/addresses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const address = await pool.query("SELECT * FROM addresses WHERE id = $1", [
      id,
    ]);
    if (address.rows.length === 0) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json(address.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// UPDATE address
router.put("/addresses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { street_name, street_number, user_id, city_id, commune_id } =
      req.body;
    const updatedAddress = await pool.query(
      "UPDATE addresses SET street_name = $1, street_number = $2, user_id = $3, city_id = $4, commune_id = $5 WHERE id = $6 RETURNING *",
      [street_name, street_number, user_id, city_id, commune_id, id]
    );
    if (updatedAddress.rows.length === 0) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json(updatedAddress.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE address
router.delete("/addresses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAddress = await pool.query(
      "DELETE FROM addresses WHERE id = $1 RETURNING *",
      [id]
    );
    if (deletedAddress.rows.length === 0) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ message: "Address deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
