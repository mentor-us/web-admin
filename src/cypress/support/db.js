/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
const {
  LocalFileSystemDuplexConnector,
  MongoDBDuplexConnector,
  MongoTransferer
} = require("mongodb-snapshot");

const fs = require("fs");
const path = require("path");

const mongoDataPath = "./mongo-data";

async function dumpDB(filename, uri = "", dbname = "") {
  const pathDb = path.join(mongoDataPath, filename);
  if (!fs.existsSync(mongoDataPath)) {
    fs.mkdirSync(mongoDataPath);
  }

  const devMongo = new MongoDBDuplexConnector({
    connection: {
      uri,
      dbname
    }
  });

  const local = new LocalFileSystemDuplexConnector({
    connection: {
      path: pathDb
    }
  });

  const transferer = new MongoTransferer({
    source: devMongo,
    targets: [local]
  });

  for await (const progress of transferer.iterator()) {
    /* empty */
  }

  return transferer.promise();
}

async function restoreDB(filename, uri = "", dbname = "") {
  const pathDb = path.join(mongoDataPath, filename);
  if (!fs.existsSync(pathDb)) {
    throw new Error("No dump file");
  }

  const devMongo = new MongoDBDuplexConnector({
    connection: {
      uri,
      dbname
    },
    astarget: {
      remove_on_startup: true,
      remove_on_failure: false
    }
  });

  const local = new LocalFileSystemDuplexConnector({
    connection: {
      path: pathDb
    }
  });

  const transferer = new MongoTransferer({
    source: local,
    targets: [devMongo]
  });

  for await (const progress of transferer.iterator()) {
    /* empty */
  }

  return transferer.promise();
}

module.exports = {
  dumpDB,
  restoreDB
};
