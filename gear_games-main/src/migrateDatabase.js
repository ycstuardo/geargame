var fs = require("fs");
const Pool = require("./database");
// const dataTables = require.resolve("dataTables.sql");

const migrateDatabase = async () => {
  try {
    const sqlMigrate = fs.readFileSync("dataTables.sql").toString();
    await Pool.query(sqlMigrate);

    const args = process.argv;
    const isMigrate = args.slice(-1)[0] === "migrate";

    if (isMigrate) {
      const sqlDataMigrate = fs.readFileSync("dataMigrate.sql").toString();
      await Pool.query(sqlDataMigrate);

      console.log("He migrado la base de datos con exito!");
    }
  } catch (error) {
    console.error(error.stack);
  }
};

module.exports = migrateDatabase;
