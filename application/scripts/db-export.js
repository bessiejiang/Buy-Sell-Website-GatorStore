const fs = require("fs");
const readline = require("readline");
const models = require("../models");

const exportFile = __dirname + "/../db-export.json";
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

    if (!(modelName in models)) {
      return console.log(`Model "${modelName}" not found`);
    }
  }

  models.sequelize.authenticate().then(async () => {
    const exportData = {};

    if (modelName) {
      // if specified a model, use that
      exportData[modelName] = await findAll(models[modelName]);
    } else {
      // else find all
      for (const [key, Model] of Object.entries(models)) {
        if (key.toLowerCase() === "sequelize") {
          continue;
        }

        exportData[key] = await findAll(Model);
      }
    }

    models.sequelize.close();
    fs.writeFileSync(exportFile, JSON.stringify(exportData, null, 2));
  });
}

async function findAll(Model) {
  return await Model.findAll().then(records =>
    records.map(record => {
      for (let field of excludeFields) {
        delete record.dataValues[field];
      }

      return record.dataValues;
    })
  );
}

function capitalize(string) {
  if (string.length < 1) {
    return string;
  }

  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
