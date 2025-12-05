variable "project_id" {}
variable "region" {}
variable "repository_id" {
  default = "backend-repo"
}

resource "google_artifact_registry_repository" "backend_repo" {
  location      = var.region
  repository_id = var.repository_id
  description   = "Docker repository for backend service"
  format        = "DOCKER"
}

output "repository_url" {
  value = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repository_id}"
}
