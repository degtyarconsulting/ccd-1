// backend/fetch-data.web.js

import { Permissions, webMethod } from "wix-web-module";
import { fetch } from "wix-fetch";
import { getSecret } from "wix-secrets-backend";

const getSecretKey = webMethod(Permissions.Anyone, async () => {
  if (process.env.LOCAL_DEV) {
    console.log("[DEV] dev environment 1");
    return "flowhub-api-key";
  }
  const key = await getSecret("flowhub-api-key");
  if (!key) {
    console.log("[ERROR] no secret key");
  }
  return key;
});

const getClientId = webMethod(Permissions.Anyone, async () => {
  if (process.env.LOCAL_DEV) {
    console.log("[DEV] dev environment 2");
    return "flowhub-client-id";
  }
  const id = await getSecret("flowhub-client-id");
  if (!id) {
    console.log("[ERROR] no client id found");
  }
  return id;
});

export const fetchAllProductData = webMethod(Permissions.Anyone, async () => {
  const key = await getSecretKey();
  const id = await getClientId();
  const url = "https://api.flowhub.co/v0/inventory";

  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      clientId: id,
      key: key,
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("[ERROR]",response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
      throw error;
    });
});
