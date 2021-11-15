import shellwords from "shellwords-ts";
import { isURL, parseField } from "./index";

export const parser = (str: string): { header?: Record<string, string>; body?: string; method?: string; url?: string } => {
  const s = shellwords.split(str);
  if (s[0] !== "curl") {
    return {};
  }
  const args = rewrite(s);
  const out: any = { method: "GET", header: {}, url: "" };
  let state = "";

  args.forEach(function (arg: string) {
    switch (true) {
      case isURL(arg):
        out.url = arg;
        break;

      case arg === "-A" || arg === "--user-agent":
        state = "user-agent";
        break;

      case arg === "-H" || arg === "--header":
        state = "header";
        break;

      case arg === "-d" ||
        arg === "--data" ||
        arg === "--data-ascii" ||
        arg === "--data-raw" ||
        arg === "--data-binary":
        state = "data";
        break;

      case arg === "-u" || arg === "--user":
        state = "user";
        break;

      case arg === "-I" || arg === "--head":
        out.method = "HEAD";
        break;

      case arg === "-X" || arg === "--request":
        state = "method";
        break;

      case arg === "-b" || arg === "--cookie":
        state = "cookie";
        break;

      case arg === "--compressed":
        out.header["Accept-Encoding"] =
          out.header["Accept-Encoding"] || "deflate, gzip";
        break;

      case !!arg:
        switch (state) {
          case "header":
            const field = parseField(arg);
            out.header[field[0]] = field[1];
            state = "";
            break;
          case "user-agent":
            out.header["User-Agent"] = arg;
            state = "";
            break;
          case "data":
            if (out.method === "GET" || out.method === "HEAD")
              out.method = "POST";
            out.header["Content-Type"] =
              out.header["Content-Type"] || "application/x-www-form-urlencoded";
            out.body = out.body ? out.body + "&" + arg : arg;
            state = "";
            break;
          case "user":
            out.header["Authorization"] = "Basic " + btoa(arg);
            state = "";
            break;
          case "method":
            out.method = arg;
            state = "";
            break;
          case "cookie":
            out.header["Set-Cookie"] = arg;
            state = "";
            break;
        }
        break;
    }
  });

  return out;
};

/**
 * Rewrite args for special cases such as -XPUT.
 */

function rewrite(args: string[]) {
  return args.reduce((args: string[], a) => {
    const newArgs = [...args];
    if (0 === a.indexOf("-X")) {
      newArgs.push("-X");
      newArgs.push(a.slice(2));
    } else {
      newArgs.push(a);
    }

    return newArgs;
  }, []);
}
