import gql from "graphql-tag";
import { useMutation, useQuery } from "react-apollo";

const TODOLIST_SELECT_QUERY = gql`
  query {
    todoList {
      id
      title
      complete
    }
  }
`;

const TODOLIST_ADD_MUTATION = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      complete
    }
  }
`;

const TODOLIST_EDIT_MUTATION = gql`
  mutation EditTodo($id: String!, $title: String, $complete: Boolean) {
    editTodo(id: $id, title: $title, complete: $complete) {
      id
      title
      complete
    }
  }
`;

const TODOLIST_REMOVE_MUTATION = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

type TodoList = {
  todoList: {
    id: string;
    title: string;
    complete: boolean;
  }[];
};

const useTodoList = () => {
  const { loading, error, data } = useQuery<TodoList>(TODOLIST_SELECT_QUERY);

  const [add] = useMutation(TODOLIST_ADD_MUTATION, {
    refetchQueries: [{ query: TODOLIST_SELECT_QUERY }],
  });
  const [edit] = useMutation(TODOLIST_EDIT_MUTATION, {
    refetchQueries: [{ query: TODOLIST_SELECT_QUERY }],
  });
  const [remove] = useMutation(TODOLIST_REMOVE_MUTATION, {
    refetchQueries: [{ query: TODOLIST_SELECT_QUERY }],
  });

  const addTodo = (title: string) => {
    add({
      variables: {
        title,
      },
    });
  };

  const toggleTodoComplete = (id: string) => {
    const todo = data && data.todoList.find((t) => t.id === id);

    if (!todo) return;

    edit({
      variables: {
        id,
        complete: !todo.complete,
      },
    });
  };

  const removeTodo = (id: string) => {
    remove({
      variables: {
        id,
      },
    });
  };

  return {
    loading,
    error,
    data,
    addTodo,
    toggleTodoComplete,
    removeTodo,
  };
};

export default useTodoList;
