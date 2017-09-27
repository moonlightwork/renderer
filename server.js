const PROTO_PATH = __dirname + '/renderer.proto';

const grpc = require('grpc');
const { Chromeless } = require('chromeless');
const renderer_proto = grpc.load(PROTO_PATH).renderer;


async function run(url) {
  const chromeless = new Chromeless();
  let html = await chromeless
      .goto(url)
      .wait(1000)
      .html();
  await chromeless.end();
  return html;
}

/**
 * Implements the CheckHealth RPC method.
 */
function checkHealth(empty, callback) {
  // TODO - can we validate that chromeless is working?
  callback(null, {})
}

/**
 * Implements the Render RPC method.
 */
function render(req, callback) {
  run(req.request.url)
    .then(html => callback(null, { html }))
    .catch(err => callback(err));
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(renderer_proto.RendererService.service, {checkHealth, render});
  server.bind('0.0.0.0:3000', grpc.ServerCredentials.createInsecure());
  server.start();
}

main()