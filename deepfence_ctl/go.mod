module github.com/deepfence/ThreatMapper/deepfence_ctl

go 1.19

replace github.com/deepfence/golang_deepfence_sdk/client => ../golang_deepfence_sdk/client/

replace github.com/deepfence/golang_deepfence_sdk/utils => ../golang_deepfence_sdk/utils/

require (
	github.com/deepfence/golang_deepfence_sdk/client v0.0.0-00010101000000-000000000000
	github.com/deepfence/golang_deepfence_sdk/utils v0.0.0-00010101000000-000000000000
	github.com/spf13/cobra v1.6.1
)

require (
	github.com/hashicorp/go-cleanhttp v0.5.2 // indirect
	github.com/hashicorp/go-retryablehttp v0.7.2 // indirect
	github.com/inconshreveable/mousetrap v1.0.1 // indirect
	github.com/mattn/go-colorable v0.1.12 // indirect
	github.com/mattn/go-isatty v0.0.14 // indirect
	github.com/rs/zerolog v1.28.0 // indirect
	github.com/spf13/pflag v1.0.5 // indirect
	golang.org/x/sys v0.4.0 // indirect
)
