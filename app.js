const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
// const typesSchema = require("./schema/types_schema");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;

mongoose.connect(
  "mongodb+srv://mongo:sdasdadad2134ed35D@cluster0.rk2pr.mongodb.net/Cluster0?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://yourapp.com",
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

app.listen(port, () => {
  console.log("Started app");
});
