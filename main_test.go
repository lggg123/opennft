package main

import (
	"bytes"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestImageUploadEndpoint(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.Default()

	// Setup Route
	router.POST("/upload-image", ImageUploadHandler) //

	// Create a test file
	file, _ := os.Create("test_image.jpg")
	defer file.Close()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, _ := writer.CreateFormFile("image", "test_image.jpg")
	_ = os.Remove("test_image.jpg")
	part.Write([]byte("image data"))
	writer.Close()

	req, _ := http.NewRequest("POST", "/upload-image", body)
	req.Header.Set("Content-Type", writer.FormDataContentType())

	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	assert.Equal(t, http.StatusOK, resp.Code)
	// Additional assertions as necessary
}
