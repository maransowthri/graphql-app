const graphql = require("graphql");

const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLNonNull,
} = graphql;

const Person = new GraphQLObjectType({
  name: "Person",
  description: "Represent person's type",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt },
    isMarried: { type: GraphQLBoolean },
    gpa: { type: GraphQLFloat },
    child: {
      type: Person,
      resolve(parent, args) {
        return parent;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "Documentation for Root Query",
  fields: {
    person: {
      type: Person,
      resolve(parent, args) {
        let person = {
          name: null,
          age: 45,
          isMarried: true,
          gpa: 4.5,
        };

        return person;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
