const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    try {
      const response = await axios.get("https://hp-api.herokuapp.com/api/characters");
      const characters = response.data;
      res.render("personajes", { layout: "layouts/main", characters });
    } catch (error) {
      console.error("Error al obtener personajes", error);
      res.status(500).send("Error al obtener personajes");
    }
  });

  module.exports = router;