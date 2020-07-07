const fsPromises = require('fs').promises;

async function readFile(pathToFile) {
  try {
    const stringData = await fsPromises.readFile(pathToFile, {
      encoding: 'utf8',
    });
    const objData = await JSON.parse(stringData);
    return objData;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  readFile,
};
