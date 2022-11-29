package router

import (
	"os"
	"strings"

	"github.com/casbin/casbin/v2"
	"github.com/deepfence/ThreatMapper/deepfence_server/apiDocs"
	"github.com/deepfence/ThreatMapper/deepfence_server/handler"
	"github.com/deepfence/ThreatMapper/deepfence_utils/log"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
	"github.com/google/uuid"
)

func SetupRoutes(r *chi.Mux, serverPort string, deployOpenapiDocs bool) error {
	// JWT
	tokenAuth := getTokenAuth()

	// authorization
	authEnforcer, err := getAuthorizationHandler()
	if err != nil {
		return err
	}

	openApiDocs := apiDocs.InitializeOpenAPIReflector()

	dfHandler := &handler.Handler{
		TokenAuth:      tokenAuth,
		AuthEnforcer:   authEnforcer,
		OpenApiDocs:    openApiDocs,
		SaasDeployment: IsSaasDeployment(),
	}

	r.Route("/deepfence", func(r chi.Router) {
		r.Get("/ping", dfHandler.Ping)
		r.Get("/async_ping", dfHandler.AsyncPing)

		// public apis
		r.Group(func(r chi.Router) {
			openApiDocs.AddLoginOperation()
			r.Post("/login", dfHandler.LoginHandler)
			if deployOpenapiDocs {
				log.Info().Msgf("OpenAPI documentation: http://0.0.0.0%s/deepfence/openapi-docs", serverPort)
				r.Get("/openapi-docs", dfHandler.OpenApiDocsHandler)
			}
		})

		// authenticated apis
		r.Group(func(r chi.Router) {
			r.Use(jwtauth.Verifier(tokenAuth))
			r.Use(jwtauth.Authenticator)

			r.Post("/logout", dfHandler.LogoutHandler)

			// current user
			r.Route("/user", func(r chi.Router) {
				r.Get("/", dfHandler.AuthHandler("user", "read", dfHandler.GetUser))
				r.Put("/", dfHandler.AuthHandler("user", "write", dfHandler.UpdateUser))
				r.Delete("/", dfHandler.AuthHandler("user", "delete", dfHandler.DeleteUser))
			})

			// manage other users
			r.Route("/users/{userId}", func(r chi.Router) {
				r.Get("/", dfHandler.AuthHandler("all-users", "read", dfHandler.GetUser))
				r.Put("/", dfHandler.AuthHandler("all-users", "write", dfHandler.UpdateUser))
				r.Delete("/", dfHandler.AuthHandler("all-users", "delete", dfHandler.DeleteUser))
			})

			// topology apis TODO: remove -api
			r.Route("/topology-api", func(r chi.Router) {
				r.Post("/report", dfHandler.IngestAgentReport)
			})
		})
	})
	return nil
}

func getTokenAuth() *jwtauth.JWTAuth {
	return jwtauth.New("HS256", uuid.New(), nil)
}

func getAuthorizationHandler() (*casbin.Enforcer, error) {
	return casbin.NewEnforcer("auth/model.conf", "auth/policy.csv")
}

func IsSaasDeployment() bool {
	if strings.ToLower(os.Getenv("SAAS_DEPLOYMENT")) == "true" {
		return true
	}
	return false
}
