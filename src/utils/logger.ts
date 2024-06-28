// logger.ts
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

const logDirectory = path.join(__dirname, "yatralogger");
console.log(logDirectory) 
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

function getLogFileName() {
  const now = new Date().toISOString();
  return `access_${now}.log`;
}

function getLogFilePath() {
  const logFileName = getLogFileName();
  return path.join(logDirectory, logFileName);
}
const requestResponseLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const requestBody = JSON.stringify(req.body);
  const oldSend = res.send;
  res.send = function (data: any) {
    const responseBody = typeof data === "string" ? data : JSON.stringify(data);
    const statusCode = res.statusCode;
    const logEntry = [
      `[${new Date().toISOString()}]`,
      `${req.method} ${req.url}`,
      `Status Code: ${statusCode}`,
      // `Request Body: ${requestBody}`,
      `Response Body: ${responseBody}`,
    ].join(" | ");
    fs.appendFile(getLogFilePath(), logEntry + "\n", (err) => {
      if (err) console.error("Failed to log request/response:", err);
    });

    return oldSend.apply(res, arguments as any);
  };

  next();
};

export { requestResponseLogger };
