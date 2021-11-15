import React, { useState, useMemo, useCallback, useEffect } from "react";
import useClippy from "use-clippy";
import axios, { Method } from "axios";
import classNames from "classnames";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PublishIcon from "@mui/icons-material/Publish";
import HttpIcon from "@mui/icons-material/Http";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import "./App.css";
import { formatter, beautyFormatInfo } from "./formatter";
import { parser } from "./formatter/parser";
import { useHistory } from "./hooks";
import { Curl } from "./types";

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

const doRequest = async (curl: string) => {
  const parsedInput = parser(curl);
  let data;
  try {
    data = await axios
      .request({
        method: parsedInput.method as Method,
        url: parsedInput.url,
        headers: {
          "Access-Control-Allow-Origin": "*",
          ...(parsedInput.header || {}),
        },
        data: parsedInput.body!.replace(/^\$/, "").replace(/\\(\\)?n/g, ""),
      })
      .then((data) => data.data);
  } catch (e) {
    return {
      error: e,
    };
  }
  return {
    data,
  };
};

function App() {
  const [input, setInput] = useState("");
  const [isRequest, setIsRequest] = useState(false);
  const [responseTime, setResponseTime] = useState(0);
  const [editingName, setEditingName] = useState("");
  const [result, setResult] = useState("");
  const [editingId, setEditingId] = useState("");
  const { curlHistories, pushHistory, removeHistory, changeHistory } =
    useHistory();
  const formatInput = useMemo(() => formatter(input), [input]);
  const [, setClipbaord] = useClippy();
  const handleChangeHistory = () => {
    if (!editingName) return;
    changeHistory({
      ...((curlHistories.find((item) => item.id === editingId) || {}) as Curl),
      name: editingName,
    });
    setEditingId("");
    setEditingName("");
  };
  const hasError = useMemo(
    () =>
      input &&
      !formatInput.variables &&
      !formatInput.query &&
      !formatInput.header,
    [input, formatInput]
  );
  const handleEditingItem = (item: Curl) => {
    setEditingId(item.id);
    setEditingName(item.name);
  };
  const handleRun = async () => {
    setResponseTime(0);
    setIsRequest(true);
    const date = Date.now();
    try {
      const { data } = await doRequest(input);
      setResult(JSON.stringify(data, null, 2));
    } catch (e) {
      setResult(JSON.stringify(e, null, 2));
    } finally {
      setIsRequest(false);
      setResponseTime(Date.now() - date);
    }
  };
  useEffect(() => {
    setResult("");
    setResponseTime(0);
  }, [input]);
  return (
    <div className="App">
      <div className="container">
        <div className="codeWrap">
          <h3>Graphql cURL</h3>
          <textarea
            className={classNames("code", { showError: hasError })}
            value={input}
            placeholder="Paste code here..."
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div className="responseInfo">
          <h3>Response Data{!!responseTime && `（${responseTime}ms）`}</h3>
          <textarea
            readOnly
            className={classNames("code", { showError: hasError })}
            value={result}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        {configs.map(({ key, title }) => {
          const value = formatInput[key as keyof typeof formatInput];
          return (
            <div className="show">
              <h3>{title}</h3>
              <textarea
                readOnly
                className="targetValue"
                value={value}
              ></textarea>
              {value && (
                <button className="copyBtn" onClick={() => setClipbaord(value)}>
                  copy
                </button>
              )}
            </div>
          );
        })}
        <div className="operations">
          <LoadingButton
            loading={isRequest}
            disabled={hasError || !input}
            onClick={handleRun}
          >
            Run
          </LoadingButton>
          <Button
            disabled={hasError || !input}
            onClick={() => setClipbaord(beautyFormatInfo(formatInput))}
          >
            Copy Info
          </Button>
          <Button
            disabled={hasError || !input}
            onClick={() => pushHistory(input)}
          >
            Save
          </Button>
          <Button disabled={!input} onClick={() => setInput("")}>
            clear
          </Button>
          <List dense={false} className="curlHistories">
            {curlHistories.map((curlHistory) => (
              <div>
                <ListItem
                  secondaryAction={
                    <div>
                      <IconButton
                        onClick={() => setInput(curlHistory.curl)}
                        edge="end"
                        aria-label="publish"
                      >
                        <PublishIcon />
                      </IconButton>

                      <IconButton
                        style={{ marginLeft: "15px" }}
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeHistory(curlHistory.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <HttpIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Input
                        style={{ width: "250px" }}
                        disabled={editingId !== curlHistory.id}
                        disableUnderline
                        endAdornment={
                          editingId === curlHistory.id ? (
                            <IconButton
                              size="small"
                              onClick={handleChangeHistory}
                            >
                              <CheckCircleOutlineIcon />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => handleEditingItem(curlHistory)}
                              size="small"
                            >
                              <EditIcon />
                            </IconButton>
                          )
                        }
                        value={
                          editingId === curlHistory.id
                            ? editingName
                            : curlHistory.name || "curl"
                        }
                        size="small"
                        id="standard-basic"
                        placeholder="Input some specific name..."
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                    }
                    secondary={curlHistory.curl}
                  />
                </ListItem>
              </div>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}

export default App;
