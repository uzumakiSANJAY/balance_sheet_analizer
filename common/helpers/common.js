const fs = require("fs");
const moment = require("moment-timezone");
const {
  TIMEZONE,
  ERROR_REGEX_1,
  ERROR_REGEX_2,
} = require("../constants/common.constants");

const envs = require("../../config/env");
const transporter = require("../../config/nodemailer");
const commonConstants = require("../constants/common.constants");

module.exports = {
  /**
   * Calculates the current date and time in IST (UTC +5:30) without using moment-timezone.
   * @returns {Date} The current date and time adjusted to IST.
   */
  calcTime: () => {
    let d = new Date();
    let utc = d.getTime() + d.getTimezoneOffset() * 60000;
    let nd = new Date(utc + 3600000 * 5.5);
    return nd;
  },

  /**
   * Gets the current date in the specified timezone.
   * @param {string} [timezone="Asia/Kolkata"] - The IANA timezone string (e.g., "Asia/Kolkata", "UTC").
   * @returns {string} The current date in "YYYY-MM-DD" format.
   */
  getCurrentDate: (timezone = TIMEZONE) => {
    return moment().tz(timezone).format("YYYY-MM-DD");
  },

  /**
   * Gets the current time in the specified timezone.
   * @param {string} [timezone="Asia/Kolkata"] - The IANA timezone string.
   * @returns {string} The current time in "HH:mm:ss" format.
   */
  getCurrentTime: (timezone = TIMEZONE) => {
    return moment().tz(timezone).format("HH:mm:ss");
  },
  getCurrentDateObj: (timezone = TIMEZONE) => {
    return moment().tz(timezone).startOf("day").toDate();
  },

  /**
   * Gets the current date and time in the specified timezone.
   * @param {string} [timezone="Asia/Kolkata"] - The IANA timezone string.
   * @returns {string} The current date and time in "YYYY-MM-DD HH:mm:ss" format.
   */
  getCurrentDateTime: (timezone = TIMEZONE) => {
    return moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");
  },

  /**
   * Gets the date of a specified number of days ago, starting from the beginning of that day.
   * @param {number} [daysAgo=0] - Number of days to subtract from today.
   * @param {string} [timezone="Asia/Kolkata"] - The IANA timezone string.
   * @returns {Date} The date object representing the start of the day `daysAgo` in the given timezone.
   */
  getPreviousDate: (daysAgo = 0, timezone = TIMEZONE) => {
    return moment()
      .tz(timezone)
      .subtract(daysAgo, "days")
      .startOf("day")
      .toDate();
  },
  getUpcomingDate: (days = 0, timezone = TIMEZONE) => {
    return moment().tz(timezone).add(days, "days").format("YYYY-MM-DD");
  },

  getYear: (days = 0, timezone = TIMEZONE) => {
    return moment().tz(timezone).add(days, "days").format("YYYY");
  },

  dateByStr: (date, timezone = TIMEZONE) => {
    return moment.tz(date, timezone).format("YYYY-MM-DD");
  },
  dateObjByStr: (date, timezone = TIMEZONE) => {
    return moment.tz(date, timezone).startOf("day").toDate();
  },
  dateChangeByYear: (date, year, timezone = TIMEZONE) => {
    return moment.tz(date, timezone).add(year, "year").format("YYYY-MM-DD");
  },
  dateByBeginning: (date, timezone = TIMEZONE) => {
    return moment.tz(date, timezone).startOf("day").toDate();
  },
  dateByEnd: (date, timezone = TIMEZONE) => {
    return moment.tz(date, timezone).endOf("day").toDate();
  },
  clearUploadedFiles: (files, file) => {
    if (files && Array.isArray(files)) {
      files.forEach((ele) => {
        if (fs.existsSync(ele.path)) {
          fs.unlinkSync(ele.path);
        }
      });
    } else if (file) {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }
  },
  removeFile: (path) => {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  },
  getRealPath: (originalPath) => {
    return originalPath.replace(/\\/g, "/").replace(/^public\//, "");
  },
  getCurrentFinancialYear: () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // JavaScript months: 0–11

    if (month >= 4) {
      return `${year}-${year + 1}`;
    } else {
      return `${year - 1}-${year}`;
    }
  },

  logError: (err) => {
    let matches;
    if (err.stack) {
      matches = err.stack.split("\n");
    } else if (err.error) {
      matches = err.error.split("\n");
    } else {
      matches = ["issue in split error"];
    }
    let regex1 = ERROR_REGEX_1;
    let regex2 = ERROR_REGEX_2;
    let errorArr1 = regex1.exec(matches[1]);
    let errorArr2 = regex2.exec(matches[1]);
    let errorFile = "";
    let errorLine = "";
    let errorText = "";
    if (errorArr1 !== null || errorArr2 !== null) {
      errorText = matches[0];
      if (errorArr1 !== null) {
        errorFile = errorArr1[1];
        errorLine = errorArr1[2];
      } else if (errorArr2 !== null) {
        errorFile = errorArr2[1];
        errorLine = errorArr2[2];
      }

      let date_format = moment.tz(TIMEZONE).format("YYYY-MM-DD HH:mm:ss");

      let errMsg = `\n DateTime: ${date_format} \n ${errorText} \n Line No : ${errorLine} \n File Path: ${errorFile} \n`;

      let errHtml = `<!DOCTYPE html><html><body><p>${errorText}</p><p>Line No : ${errorLine}</p><p>File Path: ${errorFile}</p></body></html>`;

      //LOG ERR
      const errorLogFile = commonConstants.errorLogFile(
        moment().tz(TIMEZONE).format("DD_MM_YYYY")
      );
      fs.appendFile(errorLogFile, errMsg, (err) => {
        if (err) throw err;
      });

      //SEND MAIL
      if (envs.node_env === "prod") {
        let mailOptions = {
          from: envs.mailOptions.user,
          to: commonConstants.errorLogEmailList,
          subject: `Error In ${envs.serverUrl}`,
          html: errHtml,
        };
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            module.exports.logError(err);
          }
        });
      }
    }
  },
};
