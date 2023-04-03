import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export const neonTomorrow = {
  ...tomorrow,
  'code[class*="language-"]': {
    ...tomorrow['code[class*="language-"]'],
    color: '#FFFFFF' // aqua
  }
};