const MongoClient = require("mongodb").MongoClient;

// variables.
const uri = "mongodb://localhost:27017";
const dbName = "test";
const collectionName = "mongoTest";

const config = { useNewUrlParser: true, useUnifiedTopology: true };
const client = MongoClient(uri, config);

client.connect(err => {
  if (err) throw err;

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  /**
   * Insert Obj.
   */
  const myobj = { name: "Pepito", address: "Highway 39" };
  collection.insertOne(myobj, (err, res) => {
    if (err) throw err;
    console.log("1 document inserted", { res });
    client.close();
  });

  /**
   * Find All.
   */
  collection.find().toArray((err, result) => {
    if (err) throw err;

    console.log({ result }, result.length);
    client.close();
  });

  /**
   * Update.
   */
  collection.findOneAndDelete({ name: "Carlos" }, (err, result) => {
    console.log({ result });
    client.close();
  });

  collection.findOneAndUpdate(
    { name: "Pepito" },
    { $set: { name: "Pepito Reloaded" } },
    (err, result) => {
      if (err) throw err;
      console.log({ result });
      client.close();
    }
  );
});
