// Using better-sqlite3 to connect. Documentation here:
// https://github.com/JoshuaWise/better-sqlite3/blob/HEAD/docs/api.md
const sqlite = require('better-sqlite3');

module.exports = class DbHandler {

  constructor(pathToDatabase) {
    if (DbHandler._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.")
    }
    DbHandler._instance = this;
    this.connection = sqlite(pathToDatabase);

  }

  executeCommand(command) {

    return command.execute(this);
  }

  // A method that simplifies inserting data from an array of objects
  insertMany(tableName, data) {

    // assume all objects have the same properties
    let properties = Object.keys(data[0]);

    // build a prepared statement
    let statement = this.connection.prepare(`
      INSERT INTO ${tableName} (${properties.join(', ')}) 
      VALUES (${properties.map(x => '@' + x).join(', ')})
    `);

    // insert all data
    for (var row of data) {
      statement.run(row);
    }
  }

  // A method that simplifies inserting a single object/rows
  insert(tableName, data) {
    this.insertMany(tableName, [data]);
  }

  // User run from queries like DELETE, UPDATE, CREATE TABLE etc
  run(query, params = {}) {
    let statement = this.connection.prepare(query);
    return statement.run(params);
  }

  // Use all to get all rows from a query as an array of objects
  all(query, params = {}) {
    let statement = this.connection.prepare(query);
    return statement.all(params);
  }
}