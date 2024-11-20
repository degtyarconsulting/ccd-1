// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import { fetchAllProductData } from "backend/fetch-data.web.js";
import wixWindowFrontend from "wix-window-frontend";

async function init() {
  const cannabisData = await fetchAllProductData();
  // Send cannabis data to the iframe
  $w("#html1").postMessage(cannabisData); // Use '*' to allow any origin or specify a target origin for security
}

$w.onReady(function () {
  init();
});
