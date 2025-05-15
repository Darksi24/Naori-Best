// utils/config.js
const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "../data/config.json");

function leerConfig() {
  if (!fs.existsSync(configPath)) return { nsfw: false };
  return JSON.parse(fs.readFileSync(configPath));
}

function guardarConfig(data) {
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
}

function getNSFW() {
  const config = leerConfig();
  return config.nsfw;
}

function setNSFW(state) {
  const config = leerConfig();
  config.nsfw = state;
  guardarConfig(config);
}

module.exports = {
  getNSFW,
  setNSFW
};