const { exec } = require("child_process")
function startLambda() {
//   exec(`sls offline start &> /dev/null & disown`);
  return exec(`sls offline start`).pid;
}
async function stopLambda(pid) {
  exec(`kill $(ps aux | grep ${pid} |awk '{print $2}')`);
  return
}

function sleep(ms) {
    // add ms millisecond timeout before promise resolution
    return new Promise(resolve => setTimeout(resolve, ms))
}
module.exports = { startLambda, stopLambda, sleep };