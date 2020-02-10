import low from "lowdb";
import lodashId from "lodash-id";
import FileSync from "lowdb/adapters/FileSync.js";

export default async function localDB() {
  //Set up lowdb
  const adapter = new FileSync("db.json");
  const db = low(adapter);
  db._.mixin(lodashId);

  //Define defaults
  db.defaults({ users: [], posts: [] }).write();

  //Connector implementation
  return {
    _types: { USERS: "users", POSTS: "posts" },
    getAll(type) {
      return db.get(type).value();
    },
    get(type, id) {
      return db
        .get(type)
        .getById(id)
        .value();
    },
    add(type, data) {
      return db
        .get(type)
        .insert(data)
        .write();
    },
    remove(type, id) {
      return db
        .get(type)
        .removeById(id)
        .write();
    }
  };
}
