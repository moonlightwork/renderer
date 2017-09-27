.PHONY: protoc

protoc:
	protoc -I ./ -I $(GOPATH)/src/ \
		--gogo_out=plugins=grpc:. \
		./renderer.proto
	echo "👍 Generated"
