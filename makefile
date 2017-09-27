.PHONY: protoc

protoc:
	protoc -I ./ -I $(GOPATH)/src/ \
		--plugin=protoc-gen-js_service=./node_modules/.bin/protoc-gen-js_service \
		--gogo_out=plugins=grpc:. \
		--js_out=import_style=commonjs,binary:./\
		--js_service_out=./ \
		./renderer.proto

	# Remove bad imports from js files
	awk '!/var github.com_/' ./renderer_pb.js > ./renderer_pb.tmp.js && mv ./renderer_pb.tmp.js ./renderer_pb.js
	awk '!/var github_com_/' ./renderer_pb_service.js > ./renderer_pb_service.tmp.js && mv ./renderer_pb_service.tmp.js ./renderer_pb_service.js

	echo "👍 Generated"