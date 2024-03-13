const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    console.log("Hello World");
    return res.json({ success: true, message: "Hello World" });
}
);

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);