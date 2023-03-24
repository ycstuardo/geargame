const express = require("express");
const router = express.Router();

// get all communes
router.get("/communes", async (req, res) => {
  try {
    const communes = await pool.query("SELECT * FROM communes");
    res.json(communes.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// get a single commune by id
router.get("/communes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const commune = await pool.query("SELECT * FROM communes WHERE id = $1", [
      id,
    ]);
    if (commune.rows.length === 0) {
      return res.status(404).json({ message: "Commune not found" });
    }
    res.json(commune.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// create a new commune
router.post("/communes", async (req, res) => {
  const { name, city_id } = req.body;
  try {
    const newCommune = await pool.query(
      "INSERT INTO communes (name, city_id) VALUES ($1, $2) RETURNING *",
      [name, city_id]
    );
    res.json(newCommune.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// update a commune by id
router.put("/communes/:id", async (req, res) => {
  const { id } = req.params;
  const { name, city_id } = req.body;
  try {
    const updatedCommune = await pool.query(
      "UPDATE communes SET name = $1, city_id = $2 WHERE id = $3 RETURNING *",
      [name, city_id, id]
    );
    if (updatedCommune.rows.length === 0) {
      return res.status(404).json({ message: "Commune not found" });
    }
    res.json(updatedCommune.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// delete a commune by id
router.delete("/communes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCommune = await pool.query(
      "DELETE FROM communes WHERE id = $1 RETURNING *",
      [id]
    );
    if (deletedCommune.rows.length === 0) {
      return res.status(404).json({ message: "Commune not found" });
    }
    res.json({ message: "Commune deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
