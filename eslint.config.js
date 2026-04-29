import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  //1 ignore builds del front y dependencias
  {
    ignores: ["node_modules/**", "dist/**"]
  },
  //2. Backend: server/** 
  {
files:["server/**/*.{js,mjs,djs}"],
extends: [js.configs.recommended],
languageOptions: {
  ecmaVersion:"latest",
  sourceType: "module",
  globals: {...globals.node}
}
  },
  //3 frontend
  {
    files:["server/**/*.{js,mjs,djs}"],
extends: [js.configs.recommended],
languageOptions: {
  ecmaVersion:"latest",
  sourceType: "module",
  globals: {...globals.browser}
}
  },
  
]);
