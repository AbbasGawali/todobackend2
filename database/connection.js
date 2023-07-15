const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOURI, {
    dbName: "backendapi3",
  })
  .then(() => {
    console.log("connection successfull");
  })
  .catch(() => {
    console.log("connection failed");
  });
