import React, { useState, useMemo } from "react";
import useClippy from "use-clippy";
import classNames from "classnames";
import "./App.css";
import { formatter, beautyFormatInfo } from "./formatter";

const configs = [
  {
    key: "query",
    title: "Graphql Queries",
  },
  {
    key: "variables",
    title: "Graphql Variables",
  },
  {
    key: "header",
    title: "Request Headers",
  },
];

function App() {
  const [input, setInput] = useState("");
  const formatInput = useMemo(() => formatter(input), [input]);
  const [, setClipbaord] = useClippy();
  const hasError = useMemo(
    () =>
      input &&
      !formatInput.variables &&
      !formatInput.query &&
      !formatInput.header,
    [input, formatInput]
  );
  return (
    <div className="App">
      <div className="container">
        <div className="codeWrap">
          <h3>Source Code</h3>
          <textarea
            className={classNames("code", { showError: hasError })}
            value={input}
            placeholder="Paste code here..."
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        {configs.map(({ key, title }) => {
          const value = formatInput[key as keyof typeof formatInput];
          return (
            <div className="show">
              <h3>{title}</h3>
              <textarea readOnly className="targetValue" value={value}></textarea>
              {value && (
                <button className="copyBtn" onClick={() => setClipbaord(value)}>
                  copy
                </button>
              )}
            </div>
          );
        })}
        <div className="operations">
          <button onClick={() => setClipbaord(beautyFormatInfo(formatInput))}>
            copy all info
          </button>
          <button onClick={() => setInput("")}>clear</button>
          {hasError && <p>Syntax Error</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
