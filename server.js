const PROTO_PATH = __dirname + "/renderer.proto";

var fs = require("fs");
const grpc = require("grpc");
const { Chromeless } = require("chromeless");
const renderer_proto = grpc.load(PROTO_PATH).renderer;
const agent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36";

async function runRender(url) {
  const chromeless = new Chromeless();
  let html = await chromeless
    .setUserAgent(agent)
    .goto(url)
    .wait(1500)
    .html();
  await chromeless.end();
  return html;
}

async function runPrint(url) {
  const chromeless = new Chromeless();
  let src = await chromeless
    .setUserAgent(agent)
    .goto(url)
    .wait(1500)
    .pdf();
  await chromeless.end();

  return fs.readFileSync(src, "utf8");
}

async function runScreenshot(url) {
  const chromeless = new Chromeless();
  let src = await chromeless
    .setUserAgent(agent)
    .goto(url)
    .wait(1500)
    .screenshot();
  await chromeless.end();

  return fs.readFileSync(src, "utf8");
}

/**
 * Implements the CheckHealth RPC method.
 */
function checkHealth(empty, callback) {
  // TODO - can we validate that chromeless is working?
  callback(null, {});
}

/**
 * Implements the Render RPC method.
 */
function render(req, callback) {
  runRender(req.request.url)
    .then(data => callback(null, { data }))
    .catch(err => callback(err));
}

/**
 * Implements the Print RPC method.
 */
function print(req, callback) {
  runPrint(req.request.url)
    .then(data => callback(null, { data }))
    .catch(err => callback(err));
}

/**
 * Implements the Screenshot RPC method.
 */
function print(req, callback) {
  runPrint(req.request.url)
    .then(data => callback(null, { data }))
    .catch(err => callback(err));
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(renderer_proto.RendererService.service, {
    checkHealth,
    render
  });
  server.bind("0.0.0.0:3000", grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
