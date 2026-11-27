// standard-version (bumpFiles de .versionrc.json) : le relais suit la version
// de @surgeui/vue et dépend de cette version exacte.
const readVersion = (contents) => JSON.parse(contents).version

const writeVersion = (contents, version) => {
  const json = JSON.parse(contents)
  json.version = version
  json.dependencies['@surgeui/vue'] = version
  const newline = contents.includes('\r\n') ? '\r\n' : '\n'
  return JSON.stringify(json, null, 2).replace(/\n/g, newline) + newline
}

module.exports = { readVersion, writeVersion }
