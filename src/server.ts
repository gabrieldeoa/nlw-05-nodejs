import express from "express";
import "./database";

const PORT = 3333;
const app = express();

app.get("/", (request, response) => {
  return response.send({
    message: "Welcome in NLW 05",
  });
});

app.post("/", (request, response) => {
  return response.json({ message: "Post ok." });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
