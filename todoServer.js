const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3000;
app.use(express.json());

// Initialize todo list with a sample todo
let myTodoList = [
  {
    id: uuidv4().toString(),
    title: "New Todo",
    description: "Added new todo",
  },
];

// GET ALL TODOS

app.get("/todos", (req, res) => {
  res.status(200).send(myTodoList);
});

// GET TODO BY ID
app.get("/todo/:id", (req, res) => {
  let myid = req.params.id;
  const todo = myTodoList.find((todo) => todo.id === myid);
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ err: "Todo not found" });
  }
});

app.post("/todos", (req, res) => {
  let input = req.body;
  input.id = uuidv4();
  myTodoList.push(input);
  res.status(200).json(myTodoList);
});

app.put("/todo/:id", (req, res) => {
  let myid = req.params.id;
  let input = req.body;
  for (let i = 0; i < myTodoList.length; i++) {
    if (myTodoList[i]["id"] === myid) {
      myTodoList[i]["title"] = input["title"];
      myTodoList[i]["description"] = input["description"];
      res.json(myTodoList);
    }
  }
});

app.delete("/todo/:id", (req, res) => {
  let myid = req.params.id;
  for (let i = 0; i < myTodoList.length; i++) {
    if (myTodoList[i]["id"] === myid) {
      myTodoList.splice(i, 1);
      res.json(myTodoList);
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
