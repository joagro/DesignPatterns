const DbAdapter = require('./Db/DbAdapter')
const MainMenu = require('./Menus/MainMenu');

const db = new DbAdapter('./database/MyDB.db');

app = new MainMenu(db);
app.run()