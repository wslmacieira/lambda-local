const { exec } = require("child_process")

/**
 * @type {import("child_process").ChildProcess}
 */
let child_process

function startLambda() {
  // exec(`sls offline start &> /dev/null & disown`);
  execute(`sls offline start`);
}
async function stopLambda() {
  // FIXES PIPEWRAP open handle
  child_process.stdout.destroy()
  child_process.stderr.destroy()
  child_process.stdin.destroy()
  // FIXES PROCESSWRAP open handle
  child_process.kill() // (Optional: Just if you want to kill the process)
  child_process.unref() // Necessary: fixes PROCESSWRAP
}

function execute(command) {
  child_process = exec(command)
  child_process.stdout.on('data', (data) => {
    console.log(data);
  })
};

function sleep(ms) {
  // add ms millisecond timeout before promise resolution
  return new Promise(resolve => setTimeout(resolve, ms))
}
module.exports = { startLambda, stopLambda, sleep };