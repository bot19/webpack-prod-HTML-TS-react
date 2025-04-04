import { greetPerson } from "./greetPerson";
import { polyfillTest } from "../polyfillTest";

document.getElementById("btn").addEventListener("click", greetPerson);

polyfillTest();
