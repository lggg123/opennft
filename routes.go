package main

import (
	"github.com/gin-gonic/gin"
)

// SetupRoutes configures the routes for the server.
func SetupRoutes(router *gin.Engine) {
	// Linking the route to the corresponding handler
	router.POST("/upload-image", ImageUploadHandler)
	router.POST("/create-nft", CreateNFTHandler)
	router.POST("/train-gan", TrainGANHandler)

	// You can add more routes and link them to their respective handlers here
}
