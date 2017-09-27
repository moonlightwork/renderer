const PROTO_PATH = __dirname + '/renderer.proto';
console.log(PROTO_PATH);

const grpc = require('grpc');
const { Chromeless } = require('chromeless');
const renderer_proto = grpc.load(PROTO_PATH).renderer;

/**
 * Implements the CheckHealth RPC method.
 */
function checkHealth(empty) {
  // TODO - can we validate that chromeless is working?
  return {};
}

/**
 * Implements the Render RPC method.
 */
function render(req, callback) {
  const chromeless = new Chromeless();

  try {
    let html = chromeless
      .goto(url)
      .wait(2*1000)
      .html();
  } catch (err) {
    callback(e)
  }

  callback(null, { html });
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

main();