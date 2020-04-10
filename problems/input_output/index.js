const path = require('path')
const comparestdout = require('workshopper-exercise/comparestdout')

let exercise = require('../../lib/exercise')

exercise.solution = path.join(__dirname, 'solution.js')

const aliens = require('./aliens.json')

function messageStdin (submissionStdin, solutionStdin, input) {
  const iv = setInterval(function () {
    if (input.length) {
      const msg = input.shift()
      submissionStdin.write(msg)
      if (solutionStdin) solutionStdin.write(msg)
    } else {
      clearInterval(iv)
      submissionStdin.end()
      if (solutionStdin) solutionStdin.end()
    }
  }, 50)
}

exercise.addProcessor(function (mode, callback) {
  const input = []
  for (let i = 0; i < 10; i++) {
    const alien = aliens[Math.floor(Math.random() * aliens.length)]
    input.push(`${alien}\n`)
  }

  const solutionStdin = (mode === 'verify') ? this.solutionChild.stdin : null

  messageStdin(this.submissionChild.stdin, solutionStdin, input)

  process.nextTick(function () {
    callback(null, true)
  })
})

exercise = comparestdout(exercise)

module.exports = exercise
