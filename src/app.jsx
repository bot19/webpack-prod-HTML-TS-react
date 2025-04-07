import React from "react";
import { useEffect } from "react";
import { polyfillTest } from "../polyfillTest";
import { greetPerson } from "./greetPerson";

export const App = () => {
  useEffect(() => {
    polyfillTest();
  }, []);

  return (
    <>
      <h1>Webpack prod for React</h1>
      <button onClick={greetPerson}>Click Me</button>
    </>
  );
};
