const path = require("path");

const commonConstants = Object.freeze({
  ERROR_REGEX_1: /\((.*):(\d+):(\d+)\)$/,
  ERROR_REGEX_2: /(.*):(\d+):(\d+)$/,
  PAGELIMIT: 10,
  TIMEZONE: "Asia/Kolkata",
  ROOTDIR: path.resolve(__dirname, "../.."),
  errorLogEmailList: ["sanjay.saha@intglobal.com"],
  errorLogFile: (date) => `logs/error_log_${date}.txt`,
});

module.exports = commonConstants;
