import prettier from "prettier/standalone";
import parserGraphql from "prettier/parser-graphql";

import { parser } from "./parser";

const DefaultValue = {
  url: "",
  query: "",
  header: "",
  variables: "",
  method: "GET"
};

function formatter(inputStr: string) {
  if (!inputStr) return DefaultValue;
  let body;
  let header;
  let variables;
  let query;
  let method;
  let url;
  try {
    const parsed = parser(inputStr);
    body = parsed.body || "";
    header = parsed.header || {};
    method = parsed.method;
    url = parsed.url;
    const jsCodes = JSON.parse(
      body.replace(/^\$/, "").replace(/\\(\\)?n/g, "")
    );
    variables = jsCodes.variables;
    query = jsCodes.query;
  } catch {
    return DefaultValue;
  }

  return {
    url,
    method,
    query: formatStrToGraphql(query),
    header: formatJsToJson(header),
    variables: formatJsToJson(variables),
  };
}

const formatJsToJson = (js: Record<string, any>) => {
  try {
    return JSON.stringify(js, null, 2);
  } catch {
    return "";
  }
};

const formatStrToGraphql = (str: string) => {
  try {
    return prettier.format(str, {
      parser: "graphql",
      plugins: [parserGraphql],
    });
  } catch {
    return "";
  }
};

const isURL = (s: string) => /^https?:\/\//.test(s);

const parseField = (s: string) => s.split(/: (.+)/);

const beautyFormatInfo = (formatInput: ReturnType<typeof formatter>) => `
Graphql Queries:
${formatInput.query}
Graphql Variables:
${formatInput.variables}

Request Headers:
${formatInput.header}
`;

export {
  formatJsToJson,
  formatStrToGraphql,
  isURL,
  parseField,
  formatter,
  beautyFormatInfo,
};
