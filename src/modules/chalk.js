var chalk = require('chalk');
chalk.enabled = true;
chalk.level = 3

function debugga(logname, msg){
    console.log(`${chalk.red(logname.toUpperCase())}: ${chalk.green(msg)}`);
}


function debugtmp(msg){
    console.log(`${chalk.yellow(msg)}`);
}


function chalkmsg(msg, color){
    console.log(chalk[color](msg))
}

function errmsg(logname, msg){
    console.log(`${chalk.bgRed(logname)} ${chalk.red(msg)}`);
}


function routelog(method, status, url, response_time){
    console.log(`${chalk.bgRed(method)} ${chalk.green(status)} ${chalk.cyan(url)} ${chalk.magenta(response_time)}`)
}


module.exports = {
    chalkmsg,
    debugga,
    debugtmp,
    errmsg,
    routelog
}