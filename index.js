const express = require("express");
const knex = require("knex");

const knexfile = require("./knexfile.js");

const environment = process.env.NODE_ENV || "development";

const db = knex(knexfile[environment]);

const server = express();

server.use(express.json());

server.get("/events", (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const take = Math.min(limit, 50);
  const skip = limit * (page - 1);

  db("tls")
    .orderBy("person")
    .offset(skip)
    .limit(take)
    .then(events => {
      res.status(200).json({ data: events });
    })
    .catch(error => {
      const { message, stack } = error;
      console.log("error", error);

      res.status(500).json({ message, stack });
    });
});

server.get("/", (req, res) => {
  res.json({ environment: process.env.NODE_ENV });
});

server.post("/events", (req, res) => {
  db("tls")
    .insert(req.body, ["id", "person", "age", "gender"])
    .then(inserted => {
      res.status(201).json({ data: inserted });
    })
    .catch(error => {
      const { message, stack } = error;
      console.log("error", error);

      res.status(500).json({ message, stack });
    });
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`\n== api on port ${PORT} ==\n`));
