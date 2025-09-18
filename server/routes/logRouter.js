// Import required modules
const express = require("express")
const router = express.Router();

// Import functions from controller
const {
    getLog,
    getAllLogs,
    addLog,
    updateLog,
    deleteLog
} = require('../controllers/logController')

router.get("/getAll", (req, res) => getAllLogs(req,res))   

router.get("/get/:id", (req, res) => getLog(req, res))

router.post("/add", (req, res) => addLog(req, res))

router.put("/update/:id", (req, res) => updateLog(req, res))

router.delete("/delete/:id", (req, res) => deleteLog(req, res))

module.exports = router;
