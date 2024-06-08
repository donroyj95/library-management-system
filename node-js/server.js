const express = require("express");
const cors = require("cors");
const https = require('https');
const cookieSession = require("cookie-session");
const fs = require('fs');

const app = express();

app.use(cors());
/* for Angular Client (withCredentials) */
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:8081"],
//   })
// );

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// database
const db = require("./app/models");
const Role = db.role;
const Book = db.book

db.sequelize.sync();
  //force: true will drop the table if it already exists
//   db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//    initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to library management" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// initial() 

// set port, listen for requests
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// Create the HTTPS server
https.createServer(options, app).listen(8080, () => {
  console.log('HTTPS server running on port 8080');
});

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);

// });

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });

  Book.create({
    id:1,
    title: "Harry Potter",
    auther: "JK rowling",
    filePath : "book/book1.pdf"
  })

}
