const app = require("./app");
const connection = require("./database/connection");

app.listen(process.env.PORT, () => {
  console.log(
    `listening at port ${process.env.PORT}, in : ${process.env.NODEENV} Mode `
  );
});
