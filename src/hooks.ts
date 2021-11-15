import { useState, useCallback, useEffect } from "react";
import localForage from "localforage";
import { uuid } from "./utils";
import { Curl } from "./types";

export const useHistory = () => {
  const [curlHistories, setCurlHistories] = useState<Array<Curl>>([]);
  useEffect(() => {
    localForage.getItem<Curl[]>("curlHistories").then((data) => {
      if (data) {
        setCurlHistories(data);
      }
    });
  }, []);
  const setHistories = (curls: Curl[]) => {
    setCurlHistories(curls);
    localForage.setItem("curlHistories", curls);
  };
  const pushHistory = useCallback(
    (curl: string) =>
      setHistories([{ curl, id: uuid(), name: "" }].concat(curlHistories)),
    [curlHistories]
  );
  const removeHistory = useCallback(
    (id: string) => {
      setHistories(curlHistories.filter((curlHis) => curlHis.id !== id));
    },
    [curlHistories]
  );
  const changeHistory = useCallback(
    (curl: Curl) => {
      const histories = [...curlHistories];
      histories.splice(
        curlHistories.findIndex((curlHis) => curlHis.id === curl.id),
        1,
        curl
      );
      setHistories(histories);
    },
    [curlHistories]
  );

  return {
    curlHistories,
    pushHistory,
    removeHistory,
    changeHistory,
  };
};
