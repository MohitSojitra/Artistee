import { config } from "./config";
import { getCredential } from "./localstorage";

const getRequest = async (path) => {
  try {
    const params = {
      method: "GET",
    };
    const res = await fetch(config.baseUrl + path, params);
    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (e) {
    console.log(`error in get Request (${path}) :- `, e);
  }
};

const postRequest = async (path, body) => {
  try {
    const cred = getCredential();
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...cred, ...body }),
    };

    const res = await fetch(config.baseUrl + path, params);

    const data = await res.text();

    return { statusCode: res.status, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};

const DeleteRequest = async (path) => {
  try {
    const cred = getCredential();
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...cred }),
    };

    const res = await fetch(config.baseUrl + path, params);

    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (e) {
    console.log(`error in Delete Request (${path}) :- `, e);
  }
};

const putRequest = async (path, body) => {
  try {
    const cred = getCredential();

    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, ...cred }),
    };

    const res = await fetch(config.baseUrl + path, params);

    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (e) {
    console.log(`error in PUT Request (${path}) :- `, e);
  }
};

const putImageInS3Bucket = async (url, file) => {
  try {
    // console.log({url, file})
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    };
    const result = await fetch(url, params);
    console.log(result);
    return url.split("?")[0];
  } catch (e) {
    console.log("Erorr in Put image in s3 bucket ", e);
  }
};

export const Api = {
  getRequest,
  postRequest,
  DeleteRequest,
  putRequest,
  putImageInS3Bucket,
};
