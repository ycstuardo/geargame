const express = require("express");
const router = express.Router();
const pool = require("../../database");

router.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send(results.rows);
    }
  });
});

// GET one user by ID
router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  pool.query("SELECT * FROM users WHERE id=$1", [userId], (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (results.rows.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(results.rows[0]);
    }
  });
});

// POST a new user
router.post("/users", (req, res) => {
  const { name, email, id_rol = 3 } = req.body;
  if (!name || !email) {
    res.status(400).send("Missing required fields");
  } else {
    pool.query(
      "INSERT INTO users (name, email, id_rol) VALUES ($1, $2, $3) RETURNING *",
      [name, email, id_rol],
      (error, results) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.status(201).send(results.rows[0]);
        }
      }
    );
  }
});

// PUT or update an existing user by ID
router.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, address_id, id_rol } = req.body;
  if (!name || !email || !id_rol) {
    res.status(400).send("Missing required fields");
  } else {
    pool.query(
      "UPDATE users SET name=$1, email=$2, addreses_id=$3, id_rol=$4 WHERE id=$5 RETURNING *",
      [name, email, address_id, id_rol, userId],
      (error, results) => {
        if (error) {
          res.status(500).send(error.message);
        } else if (results.rows.length === 0) {
          res.status(404).send("User not found");
        } else {
          res.status(200).send(results.rows[0]);
        }
      }
    );
  }
});

module.exports = router;
