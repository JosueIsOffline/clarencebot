
const chalk = require("chalk");
const moment = require("moment");

module.exports = class Logger {
  static log(content, type = "info") {
    const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
    switch (type) {
      case "info": {
        return console.log(
          `${chalk.hex("#49be25")(
            `🔰 INFO        ${chalk.hex("#49be25")(`[${date}]`)} `
          )} ${chalk.hex("#2587be")(content)}`
        );
      }
      case "warn": {
        return console.log(
            `${chalk.hex("#ffd966")(
                `⚠️ WARNING        ${chalk.hex("#ffd966")(`[${date}]`)} `
            )} ${chalk.hex("#ECC211")(content)}`
        )
      }
      case "error": {
        return console.log(
            `${chalk.hex("#A61717")(
                `❌ ERROR        ${chalk.hex("#A61717")(`[${date}]`)} `
            )} ${chalk.hex("#620E0E")(content)}`
        )
      }
      case "cmd": {
        return console.log(
            `${chalk.hex("#49be25")(
              `🔵 COMMANDS        ${chalk.hex("#49be25")(`[${date}]`)} `
            )} ${chalk.hex("#49be25")(content)}`
          );
      }
      case "event": {
        return console.log(
            `${chalk.hex("#49be25")(
              `🟣 EVENTS        ${chalk.hex("#49be25")(`[${date}]`)} `
            )} ${chalk.hex("#49be25")(content)}`
          );
      }
      case "success": {
        return console.log(
            `${chalk.hex("#1FAC64")(
              `☑️ SUCCESS        ${chalk.hex("#1FAC64")(`[${date}]`)} `
            )} ${chalk.hex("#1FAC64")(content)}`
          );
      }
      default:
        throw new TypeError(
          "Logger type must be either info, warn, error, cmd, event or success."
        );
    }
  }
};