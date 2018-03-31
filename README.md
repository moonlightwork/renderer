# Renderer

[![Docker Automated build](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](https://hub.docker.com/r/moonlightwork/renderer/) [![Moonlight contractors](https://www.moonlightwork.com/shields/moonlight.svg)](https://www.moonlightwork.com/?referredByUserID=1&referralProgram=maintainer&referrerName=the%20Moonlight%20team)
[![Godoc Reference](https://godoc.org/github.com/moonlightwork/renderer?status.svg)](https://godoc.org/github.com/moonlightwork/renderer)

Renderer is a gRPC service that renders webpage HTML using the [Chromeless](https://github.com/graphcool/chromeless) package. It was inspired by the [chromeless-prerender](https://github.com/matteo-hertel/chromeless-prerender) project.

## Motivation

At Moonlight, we needed to do prerendering of our Javascript single-page application. We wanted to use prerender.io, but it didn't seem maintained enough to be compatible with the latest Javascript. We put together this renderer project so that we could just run one (or more) containers inside of our Kubernetes cluster for rendering. We manage caching on the client, so no explicit caching is added to this server.

## Contributing

Changes are welcome. If you modify the proto file, please regenerate and commit the built protoc files using `make`. This allows this package to be `go get`-able for use in clients that interact with the server.

## Usage

## Booting server in Docker

```sh
docker-compose up # add `--build` to force a rebuild, `-d` to run in background
```

### Go Client

```go
package main

import (
	"fmt"

	"golang.org/x/net/context"

	"github.com/moonlightwork/renderer"
	"google.golang.org/grpc"
)

func main() {
	// Create connection (insecure)
	opts := []grpc.DialOption{grpc.WithInsecure()}
	conn, err := grpc.Dial("localhost:3000", opts...)
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	// Create client
	client := renderer.NewRendererServiceClient(conn)

	// Try health check endpoint to make sure container is online
	_, err = client.CheckHealth(context.Background(), &renderer.Empty{})
	if err != nil {
		panic(err)
	}
	fmt.Println("✅ API Online")

	// Try rendering a URL
	res, err := client.Render(context.Background(), &renderer.Request{Url: "https://www.moonlightwork.com/about"})
	if err != nil {
		panic(err)
	}

	// Printing HTML to show that it's been rendered
	fmt.Printf("\n\n%v\n\n", res.Data)

	fmt.Println("💡 Successfully fetched HTML")
}
```
