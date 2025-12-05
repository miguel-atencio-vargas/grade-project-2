variable "project_id" {
  description = "The GCP Project ID"
  type        = string
}

variable "region" {
  description = "The GCP Region"
  type        = string
  default     = "us-central1"
}

variable "frontend_bucket_name" {
  description = "Name of the GCS bucket for frontend hosting"
  type        = string
}

variable "backend_service_name" {
  description = "Name of the Cloud Run service for backend"
  type        = string
  default     = "backend-api"
}

variable "backend_image" {
  description = "Docker image for the backend service"
  type        = string
}

variable "firebase_database_id" {
  description = "The Firestore Database ID"
  type        = string
  default     = "(default)"
}
