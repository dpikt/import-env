const dotenv = require('dotenv')
const exists = val => val !== undefined

// Load env
dotenv.load()

const importEnv = (...keys) => {

  const output = {}

  keys.forEach(key => {
    // If string, look up key in env
    if (typeof key === 'string') return output[key] = process.env[key]
    // If not string or object, throw exception
    if (typeof key !== 'object') throw 'Must be string or object'
    // If object, parse object specs
    const {
      name,
      alias,
      default: defaultValue,
      required,
    } = key
    // Look up key in env
    const valueFromEnv = process.env[name]
    // Fall back to default value
    const value = exists(valueFromEnv) ? valueFromEnv : defaultValue
    // Check presence if required
    if (required && !exists(value)) throw `load-env: missing env variable ${name}`
    // Use alias if provided
    return output[alias || name] = value
  })

  return output
}

module.exports = importEnv