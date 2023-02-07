//import required modules
const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const dbUrl =
  "mongodb://assign1user:assign1!@127.0.0.1:27017/?authMechanism=DEFAULT&authSource=assign1db";
const client = new MongoClient(dbUrl);

//set up Express object and port
const app = express();
const port = process.env.PORT || "8888";

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//setup public folders
app.use(express.static(path.join(__dirname, "public")));

var links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Shopping Cart",
    path: "/shopping-cart",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
  },
];

//Express app
app.get("/", (req, res) => {
  res.render("index", { title: "Home", menu: links });
});
app.get("/shopping-cart", async (req, res) => {
  var items = await getCart();
  res.render("shopping-cart", {
    title: "Shopping Cart",
    menu: links,
    cart: items,
  });
  console.log(items);
});
app.get("/contact-us", (req, res) => {
  res.render("contact-us", { title: "Contact Us", menu: links });
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

//Connections
async function connection() {
  await client.connect();
  db = client.db("assign1db");
  return db;
}

async function getCart() {
  db = await connection();
  var results = db.collection("MockazonCart").find({});
  res = await results.toArray();
  console.log(results);
  return res;
}
