const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const PORT = 3000;

mongoose.connect("mongodb://mongo:27017/mydatabase")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    name: String
});

const User = mongoose.model("User", UserSchema);

app.get("/", (req, res) => {
    res.send("Node + MongoDB Docker App Running 🚀");
});

app.post("/add-user", async (req, res) => {
    const user = new User({
        name: req.body.name
    });

    await user.save();

    res.send("User Added");
});

app.get("/users", async (req, res) => {
    const users = await User.find();

    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
