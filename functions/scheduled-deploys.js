// scheduled-deploy.js
//const { schedule } = require('@netlify/functions');
const fetch = require("node-fetch");
const WEBHOOK_URL = process.env.BUILD_HOOK

const handler = async function(event, context) {
  console.log("Rebuilding site. Received event:", event)
  await fetch(WEBHOOK_URL, {method: 'POST'});

  return {
    statusCode: 200,
  };
};

//module.exports.handler = schedule("@daily", handler);
module.exports.handler = handler
