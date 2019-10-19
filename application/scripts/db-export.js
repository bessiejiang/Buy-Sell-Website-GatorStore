const fs = require("fs");
const path = require("path");
const readline = require("readline");
const models = require("../models");

const exportFile = path.resolve(__dirname, "../db-export.json");
const excludeFields = ["id", "createdAt", "updatedAt"];

fs.stat(exportFile, (err, stat) => {
  if (!stat) {
    // file not found
    return runExport();
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Overwrite db-export.json? [Y/n] ", answer => {
    if (answer.match(/^(\s*|[yY].*)$/)) {
      runExport();
    }

    rl.close();
  });
});

function runExport() {
  let [, , modelName] = process.argv;

  if (modelName) {
    // if specified a model, try to find it
    modelName = capitalize(modelName);

    if (!(modelName in models) || modelName === "Sequelize") {
      const allModels = Object.keys(models)
        .map(s => s.toLowerCase())
        .filter(s => s !== "sequelize");

      console.log(`Model "${modelName}" not found`);
      console.log("Specify one of:", allModels.join(", "));
      return;
    }
  }

  models.sequelize.authenticate().then(async () => {
    const exportData = {};

    if (modelName) {
      // if specified a model, use that
      console.log("Exporting", modelName);
      exportData[modelName] = await findAll(models[modelName]);
    } else {
      // else find all
      for (const [key, Model] of Object.entries(models)) {
        if (key.toLowerCase() === "sequelize") {
          continue;
        }

        console.log("Exporting", key);
        exportData[key] = await findAll(Model);
      }
    }

    models.sequelize.close();
    fs.writeFileSync(exportFile, JSON.stringify(exportData, null, 2));
  });
}

async function findAll(Model) {
  return await Model.findAll()
    .then(records =>
      records.map(record => {
        for (let field of excludeFields) {
          delete record.dataValues[field];
        }

        return record.dataValues;
      })
    )
    .catch(err => {
      console.log(err.original.sqlMessage);
    });
}

function capitalize(string) {
  if (string.length < 1) {
    return string;
  }

  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
