const graphql = require("graphql");
const User = require("../model/user");
const Hobby = require("../model/hobby");
const Post = require("../model/post");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// Dummy data
// const USERS = [
//   { id: "1", name: "Karan", age: 29, designation: "Police Officer" },
//   { id: "2", name: "Kalees", age: 24, designation: "Army Man" },
//   { id: "3", name: "Maran", age: 24, designation: "Software Engineer" },
//   { id: "4", name: "Mahesh", age: 22, designation: "Police Officer" },
// ];

// const HOBBIES = [
//   { id: "1", title: "Reading", userID: "1" },
//   { id: "2", title: "Playing", userID: "2" },
//   { id: "3", title: "Listening to music", userID: "3" },
//   { id: "4", title: "Learning new skills", userID: "4" },
// ];

// const POSTS = [
//   { id: "1", content: "This is amazing!", userID: "1" },
//   { id: "2", content: "You nailed it!", userID: "1" },
//   { id: "3", content: "Good to hear!", userID: "2" },
//   { id: "4", content: "Thanks for sharing!", userID: "3" },
// ];

// Create Types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    designation: { type: GraphQLString },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        // return HOBBIES.filter((hobby) => hobby.userID === parent.id);
        return Hobby.find({ userID: parent.id });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        // return POSTS.filter((post) => post.userID === parent.id);
        return Post.find({ userID: parent.id });
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Documentation for hobby",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        // return USERS.find((user) => user.id === parent.userID);
        return User.findById(parent.userID);
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Bobby description",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        // return USERS.find((user) => user.id === parent.userID);
        return User.findById(parent.userID);
      },
    },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "I'm the Root Query",
  fields: {
    users: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
        // return USERS;
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findById(args.id);
        // return USERS.find((user) => user.id === args.id);
      },
    },
    hobbies: {
      type: GraphQLList(HobbyType),
      resolve(parent, args) {
        // return HOBBIES;
        return Hobby.find({});
      },
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // return HOBBIES.find((hobby) => hobby.id == args.id);
        return Hobby.findById(args.id);
      },
    },
    posts: {
      type: GraphQLList(PostType),
      resolve(parent, args) {
        // return POSTS;
        return Post.find({});
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // return POSTS.find((post) => post.id === args.id);
        return Post.findById(args.id);
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLID) },
        designation: { type: GraphQLString },
      },

      resolve(parent, args) {
        let user = new User({
          name: args.name,
          age: args.age,
          designation: args.designation,
        });
        return user.save();
      },
    },
    UpdateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLID },
        designation: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              age: args.age,
              designation: args.designation,
            },
          },
          { new: true }
        );
      },
    },
    DeleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(present, args) {
        return User.findByIdAndRemove(args.id);
      },
    },
    CreatePost: {
      type: PostType,
      args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let post = new Post({
          content: args.content,
          userID: args.userID,
        });
        return post.save();
      },
    },
    UpdatePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Post.findByIdAndUpdate(
          args.id,
          {
            $set: {
              content: args.content,
            },
          },
          { new: true }
        );
      },
    },
    DeletePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Post.findByIdAndRemove(args.id);
      },
    },
    CreateHobby: {
      type: HobbyType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        userID: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let hobby = new Hobby({
          title: args.title,
          userID: args.userID,
        });

        return hobby.save();
      },
    },
    UpdateHobby: {
      type: HobbyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Hobby.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
            },
          },
          { new: true }
        );
      },
    },
    DeleteHobby: {
      type: HobbyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Hobby.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
