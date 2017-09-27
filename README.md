# Renderer

[![Build Status](https://travis-ci.org/moonlightwork/renderer.svg?branch=master)](https://travis-ci.org/moonlightwork/renderer) [![Moonlight contractors](https://img.shields.io/badge/contractors-2000-brightgreen.svg)](https://moonlightwork.com/) [![Docker Automated build](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](https://hub.docker.com/r/moonlightwork/renderer/) 

Renderer is a gRPC service that renders webpage HTML using the [Chromeless](https://github.com/graphcool/chromeless) package. It was inspired by the [chromeless-prerender](https://github.com/matteo-hertel/chromeless-prerender) project.

## Motivation

At Moonlight, we needed to do prerendering of our Javascript single-page application. We wanted to use prerender.io, but it didn't seem maintained enough to be compatible with the latest Javascript. We put together this renderer project so that we could just run one (or more) containers inside of our Kubernetes cluster for rendering. We manage caching on the client, so no explicit caching is added to this server.

## Contributing

Changes are welcome. If you modify the proto file, please regenerate and commit the built protoc files using `make`. This allows this package to be `go get`-able for use in clients that interact with the server.

## Usage

## Booting server in Docker

### Go Client

