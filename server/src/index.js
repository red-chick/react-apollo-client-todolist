const express = require("express");
const cors = require("cors");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schema.js");

const app = express();
const port = 8080;

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`listening on ${port}`));
