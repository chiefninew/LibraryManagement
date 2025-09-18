const Log = require('../models/log')

const getLog = async (req, res) => {
  const logId = req.params.id;

  Log.findById(logId, (err, log) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }

    return res.status(200).json({
      success: true,
      log
    });
  });
}

const getAllLogs = async (req, res) => {
  try {
    // filters from query params
    const { date, name, grade, section } = req.query;

    let filter = {};

    if (date) {
      // Match logs created on that date (ignores time)
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }

    if (name) {
      filter.name = { $regex: name, $options: "i" }; // case-insensitive
    }

    if (grade) {
      filter.grade = { $regex: grade, $options: "i" };
    }

    if (section) {
      filter.section = { $regex: section, $options: "i" };
    }

    const logs = await Log.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      logsList: logs
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
}

const addLog = async (req, res) => {
  const newLog = {
    ...req.body
  }
  console.log(newLog)
  Log.create(newLog, (err, log) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }

    return res.status(200).json({
      success: true,
      newLog: log
    });
  })
}

const updateLog = async (req, res) => {
  const logId = req.params.id
  const updatedLog = req.body

  Log.findByIdAndUpdate(logId, updatedLog, (err, log) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }

    return res.status(200).json({
      success: true,
      updatedLog: log
    });
  })
}

const deleteLog = async (req, res) => {
  const logId = req.params.id

  Log.findByIdAndDelete(logId, (err, log) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }

    return res.status(200).json({
      success: true,
      deletedLog: log
    });
  })
}

module.exports = {
  getLog,
  getAllLogs,
  addLog,
  updateLog,
  deleteLog
}
