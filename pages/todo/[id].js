import React from "react";
import { useRouter } from "next/router";

const Todo = () => {
  const router = useRouter();
  return <h1>i am a todo with id {router.query.id}</h1>;
};

export default Todo;
