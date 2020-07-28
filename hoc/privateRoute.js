import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export function privateRoute(WrappedComponent) {
  return () => {
    const [loggedIn, setLogin] = useState(false);
    const router = useRouter();

    useEffect(() => {
      if (!loggedIn) router.push("/login");
    }, [loggedIn]);

    return <WrappedComponent />;
  };
}
