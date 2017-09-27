// package: renderer
// file: renderer.proto

var jspb = require("google-protobuf");
var renderer_pb = require("./renderer_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var RendererService = {
  serviceName: "renderer.RendererService"
};
RendererService.CheckHealth = {
  methodName: "CheckHealth",
  service: RendererService,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: google_protobuf_empty_pb.Empty
};
RendererService.Render = {
  methodName: "Render",
  service: RendererService,
  requestStream: false,
  responseStream: false,
  requestType: renderer_pb.Request,
  responseType: renderer_pb.Response
};
module.exports = {
  RendererService: RendererService,
};

