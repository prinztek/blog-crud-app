const express = require("express");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const knexConfig = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

const db = knex(knexConfig);
const port = process.env.PORT || 3000;

// Middleware for JWT validation
const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers["Authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" }); // Return if no Authorization header is found
  }

  // Check if the Authorization header starts with "Bearer "
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: "Unauthorized" }); // Return if token verification fails
    }

    // req.user = decoded; // Attach the decoded payload to the request object
    next(); // Call the next middleware or route handler
  });
};

app.get("/", async function (req, res) {
  res.send("Hello World!");
});

// GET ALL USERS
app.get("/users", async function (req, res) {
  try {
    const user = await db.select().table("users");
    // send response with status and return object
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// CREATE USER
app.post("/register", async function (req, res) {
  // request body contains the user object
  const newUser = req.body;
  const { username, email, password } = newUser;

  // transaction: inserting a new record in users table
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const [response] = await db("users")
      .insert({
        username: username,
        email: email,
        password_hash: passwordHash,
      })
      .returning("*");

    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const userProfileWithToken = { ...response, token: token };
    // send response with status and return object
    res.status(201).json(userProfileWithToken);
  } catch (error) {
    console.error("Error inserting record:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the resource" });
  }
});

// LOGIN USER
app.post("/login", async function (req, res) {
  // request body contains the user object
  const user = req.body;

  const { email, password } = user;

  // transaction: returns a record from users table
  try {
    const [user] = await db.select().from("users").where({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const userProfileWithToken = { ...user, token: token };
    // send response with status and return object
    res.status(200).json(userProfileWithToken);
  } catch (error) {
    console.error("Error inserting record:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the resource" });
  }
});

// GET SPECIFIC USER
app.get("/users/:id", async function (req, res) {
  // request params contains id or uid
  const { id } = req.params;
  // transaction: delete a record(user) in users table
  try {
    const user = await db.select().table("users").where("users.id", "=", id);
    // send response with status and return object
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// UPDATE USER
app.put("/users/:id", verifyToken, async function (req, res) {
  const { id } = req.params;
  // request body contains the updated user values object
  const { username } = req.body;

  // transaction: updating a record(user details) in users table
  try {
    const updatedUser = await db("users")
      .where("users.user_id", "=", id)
      .update({ username: username })
      .returning(["user_id", "username", "email", "created_at"]);
    // send response with status and return object
    console.log(updatedUser);
    if (updatedUser.length > 0) {
      return res.status(200).json(updatedUser[0]);
    }
  } catch (error) {
    console.log(error.message);
    console.error("Error updating record");
    return res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
});

// DELETE USER
app.delete("/users/:id", verifyToken, async function (req, res) {
  // request params contains id or uid
  const { id } = req.params;
  console.log("Attempting to delete user with id:", id);
  // transaction: delete a record(user) in users table
  try {
    // send response with status and return object
    const deletedAccount = await db("users").where({ id: id }).del();
    console.log("Successfully deleted user with id:", id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting record:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the resource" });
  }
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// CREATE STORY
app.post("/stories/:id", async function (req, res) {
  // request params contains the user id
  const { id } = req.params;

  // request body contains the story object
  const newStory = req.body;
  const { title, content } = newStory;
  // transaction: inserting a new record(story details) in stories table
  try {
    const [response] = await db("stories")
      .insert({
        user_id: id,
        title: title,
        content: content,
      })
      .returning("*");
    // send response with status and return object
    res.status(201).json(response);
  } catch (error) {
    console.error("Error inserting record:", error);
    res.status(500).send("An error occurred while creating the resource");
  }
});

// GET ALL STORY BY USER
app.get("/users/:id/stories", verifyToken, async function (req, res) {
  // request params contains id
  const { id } = req.params;
  // transaction: delete a record(story details) in story table
  try {
    const stories = await db
      .select()
      .from("stories")
      .join("users", "stories.story_id", "=", "users.user_id")
      .where("users.user_id", "=", id);
    // send response with status and return object
    res.status(200).json(stories);
  } catch (error) {
    console.error("Error getting the record:", error);
    res.status(404).send("no story found");
  }
});

// GET SPECIFIC STORY
app.get("/stories/:id", async function (req, res) {
  // request params contains id
  const { id } = req.params;
  // transaction: retrieve stories by on id
  try {
    const [story] = await db
      .select(
        "stories.story_id",
        "stories.title",
        "stories.content",
        "stories.created_at",
        "users.user_id",
        "users.username",
        "users.email"
      )
      .from("stories")
      .join("users", "stories.story_id", "=", "users.user_id")
      .where("stories.story_id", "=", id);
    // send response with status and return object
    res.status(200).json(story);
  } catch (error) {
    console.error("Error getting the record:", error);
    res.status(404).send("no story found");
  }
});

// GET ALL STORIES
app.get("/stories", async function (req, res) {
  // transaction: for now => select all stories a record(story details) in story table
  try {
    const story = await db
      .select()
      .from("stories")
      .join("users", "stories.story_id", "=", "users.user_id");
    // send response with status and return object
    res.status(200).json(story);
  } catch (error) {
    console.error("Error getting the record:", error);
    res.status(404).send("no story found");
  }
});

// UPDATE STORY =>
// req.body = whole story object
// update later to work with only the updated values
app.put("/stories/:id", verifyToken, async function (req, res) {
  // request params contains story id
  const { id } = req.params;
  // request body contains the updated story object
  const { title, content } = req.body;
  // transaction: updating a record(story details) in stories table
  try {
    const updatedStory = await db("stories")
      .where({ story_id: id })
      .update({ title: title, content: content })
      .returning(["title", "content"]);
    // send response with status | return object
    console.log(updatedStory);
    if (updatedStory.length > 0) {
      return res.status(200).send(updatedStory[0]);
    }
  } catch (error) {
    console.log(error.message);
    console.error("Error updating record");
    return res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
});

// DELETE STORY
app.delete("/stories/:id", verifyToken, async function (req, res) {
  // request params contains id
  const { id } = req.params;
  // transaction: delete a record(story details) in stories table
  try {
    // send response with status and return object
    await db("stories").where({ story_id: id }).del();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).send("An error occurred while creating the resource");
  }
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

// stretch goals
//  - when getting all user story add a start and limit for pagination

// table creation code
//  CREATE TABLE users (
//   user_id SERIAL PRIMARY KEY,                       -- Unique identifier for each user, auto-incremented
//   username VARCHAR(50) NOT NULL UNIQUE,            -- Username for the user, must be unique
//   email VARCHAR(100) NOT NULL UNIQUE,               -- Email address for the user, must be unique
//   password_hash VARCHAR(255) NOT NULL,              -- Password hash for secure authentication
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Timestamp when the user was created
// );

// CREATE TABLE stories (
//   story_id SERIAL PRIMARY KEY,                       -- Unique identifier for each story
//   user_id INT NOT NULL,                             -- Foreign key to the users table
//   title VARCHAR(255) NOT NULL,                      -- Title of the story
//   content TEXT NOT NULL,                            -- Main content of the story
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Timestamp when the story was created
//   FOREIGN KEY (user_id) REFERENCES users(user_id)  -- Foreign key constraint linking to the users table
//       ON DELETE CASCADE                            -- Automatically deletes stories if the associated user is deleted
// );
