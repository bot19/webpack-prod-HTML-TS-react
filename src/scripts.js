import { greetPerson } from "./greetPerson";
import { polyfillTest } from "../polyfillTest";
import "./styles.css";

document.getElementById("btn").addEventListener("click", greetPerson);

polyfillTest();
