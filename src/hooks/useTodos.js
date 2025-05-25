import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../config/axiosConfig";

// const API = "http://localhost:3000/api/todos";

/**
 * Centralised data‑access layer for todos
 */
const fetchTodos = async (userId) => {
  const { data } = await axiosInstance.get(`/api/todos/user/${userId}`, {
    withCredentials: true,
  });
  return data;
};
const createTodo = async ({ userId, payload }) => {
  const { data } = await axiosInstance.post(
    `/api/todos/user/${userId}`,
    payload,
    {
      withCredentials: true,
    }
  );
  return data;
};
const updateTodo = async ({ id, userId, payload }) => {
  const { data } = await axiosInstance.put(
    `/api/todos/user/${userId}/${id}`,
    payload,
    {
      withCredentials: true,
    }
  );
  return data;
};
const deleteTodo = async ({ id, userId }) => {
  await axiosInstance.delete(`/api/todos/user/${userId}/${id}`, {
    withCredentials: true,
  });
  return id;
};

export const useTodos = (userId) => {
  const qc = useQueryClient();

  // -------- queries --------
  const todosQuery = useQuery({
    queryKey: ["todos", userId],
    queryFn: () => fetchTodos(userId),
    enabled: !!userId,
  });

  // -------- mutations --------
  const createTodoMutation = useMutation({
    mutationFn: (payload) => createTodo({ userId, payload }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos", userId] }),
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, payload }) => updateTodo({ id, userId, payload }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos", userId] }),
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id) => deleteTodo({ id, userId }),
    onSuccess: (_, id) => {
      qc.setQueryData(["todos", userId], (old) =>
        old.filter((t) => t._id !== id)
      );
    },
  });

  return {
    todos: todosQuery.data ?? [],
    isLoading: todosQuery.isLoading,
    error: todosQuery.error,
    refetch: todosQuery.refetch,
    createTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
  };
};
