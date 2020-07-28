import React from "react";
import { useRouter } from "next/router";

import { privateRoute } from "../../../hoc/privateRoute";

const UpdateTodo = () => {
  const router = useRouter();
  return <h1>Update todo with id {router.query.id}</h1>;
};

export default privateRoute(UpdateTodo);
