const path = require('path');
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/index.js')
const errorMiddleware  = require('../backend/middleware/errorMiddleware.js')


const { generateFile } = require("./generateFile");
const { addJobToQueue } = require("./jobQueue");
const Job = require("./models/Job");

//compilerConnection is the connection to the compiler database
const compilerConnection = mongoose.connect(
    "mongodb://0.0.0.0/compiler",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log("Successfully connected to compiler mongodb database");
    }
);

// mainDB is the connection to the main user database
const mainDB = mongoose.createConnection(
    "mongodb+srv://omsinkar03bit:z4Hn6Nf7SARTBXXR@cluster0.zhssb6c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/DB1",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mainDB.on("open", () => {
    console.log("Successfully connected to mainDB database");
  });
  
// Maintain the error handling for connection issues
mainDB.on("error", (err) => {
    console.error("Error connecting to DB1 database:", err);
    process.exit(1);
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
    console.log("Hello World");
    return res.json({ success: true, message: "Hello World" })
});

app.get("/status", async (req, res) => {
    const jobId = req.query.id;
    if (jobId === undefined) {
        return res
            .status(400)
            .json({ success: false, error: "missing id query param" });
    }
    try {
        const job = await Job.findById(jobId);
        if (job === undefined) {
            return res
                .status(404)
                .json({ success: false, error: "invalid job id" });
        }
        return res.status(200).json({ success: true, job });
    } catch (err) {
        return res
            .status(400)
            .json({ success: false, error: JSON.stringify(err) });
    }
});

app.post("/run", async (req, res) => {
    const { language = "python", code, input = "" } = req.body;
    if (code === undefined) {
        return res
            .status(400)
            .json({ success: false, error: "Empty code body" });
    }

    let job;

    try {
        // generate c++ file with content from request
        const files = await generateFile(language, code, input);

        const [filepath, inputFilePath] = files;

        job = await new Job({ language, filepath, inputFilePath }).save({ connection: compilerConnection });
        // console.log(job);

        const jobId = job["_id"];
        addJobToQueue(jobId);

        res.status(201).json({ success: true, jobId });
    } catch (err) {
        return res
            .status(500)
            .json({ success: false, err: JSON.stringify(err) });
    }
});

// if (process.env.NODE_ENV === 'production') {
//     const __dirname = path.resolve();
//     app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
//     app.get('*', (req, res) =>
//       res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
//     );
//   } else {
//     app.get('/', (req, res) => {
//       res.send('API is running....');
//     });
//   }

const port = 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// http://localhost:5000/run
