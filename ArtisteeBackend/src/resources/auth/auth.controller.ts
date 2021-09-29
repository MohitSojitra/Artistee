import express from "express";
import { sendResponseError } from "../../utils/auth.middleware";

import { Base64 } from "js-base64";
import config from "../../config";
import { isAuthenticated } from "../../utils/utility.function";

export const signin = async (req: express.Request, res: express.Response) => {
  const { password, userName } = req.body;
  try {
    if (isAuthenticated(userName, password)) {
      res.status(200).send({ isOk: true, message: "Login Successful" });
      return;
    }
    sendResponseError(400, { isOk: false, message: "Invalid Credential" }, res);
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};
