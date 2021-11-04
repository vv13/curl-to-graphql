import React, { useState, useMemo } from "react";
import useClippy from "use-clippy";
import classNames from "classnames";
import "./App.css";
import { formatter, beautyFormatInfo } from "./formatter";

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
        <textarea
          
          className={classNames("code", { showError: hasError })}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        {[formatInput.query, formatInput.header, formatInput.variables].map(
          (value) => (
            <div className="show">
              <textarea className="targetValue" value={value}></textarea>
              {value && (
                <button className="copyBtn" onClick={() => setClipbaord(value)}>
                  copy
                </button>
              )}
            </div>
          )
        )}
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
