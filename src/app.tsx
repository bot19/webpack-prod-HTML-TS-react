import { useEffect } from "react";
import { polyfillTest } from "./polyfillTest";
import { greetPerson } from "./greetPerson";

export const App = () => {
  useEffect(() => {
    polyfillTest();
  }, []);

  return (
    <>
      <h1>
        Webpack prod for{" "}
        <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
          React
        </a>
        , with TS!
      </h1>
      <button onClick={greetPerson}>Click Me</button>
    </>
  );
};
