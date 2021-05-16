const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLBoolean,
} = require("graphql");

const API_HOSTNAME = "http://localhost:4000";

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    complete: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    todo: {
      type: TodoType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios
          .get(`${API_HOSTNAME}/todolist/${args.id}`)
          .then((res) => res.data);
      },
    },
    todoList: {
      type: new GraphQLList(TodoType),
      resolve(parentValue, args) {
        return axios.get(`${API_HOSTNAME}/todolist`).then((res) => res.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .post(`${API_HOSTNAME}/todolist`, {
            title: args.title,
            complete: false,
          })
          .then((res) => res.data);
      },
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .delete(`${API_HOSTNAME}/todolist/${args.id}`)
          .then((res) => res.data);
      },
    },
    editTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        complete: { type: GraphQLBoolean },
      },
      resolve(parentValue, args) {
        return axios
          .patch(`${API_HOSTNAME}/todolist/${args.id}`, args)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
