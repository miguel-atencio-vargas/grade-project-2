variable "project_id" {}
variable "region" {}
variable "service_name" {}
variable "image_name" {}
variable "firebase_project_id" {}
variable "firebase_database_id" {}

resource "google_cloud_run_service" "backend_service" {
  name     = var.service_name
  location = var.region

  template {
    spec {
      containers {
        image = var.image_name
        
        env {
          name  = "API_PORT"
          value = "8080" # Cloud Run default port
        }
        env {
          name  = "NODE_ENV"
          value = "production"
        }
        env {
          name  = "HOSTNAME"
          value = "0.0.0.0"
        }
        env {
          name  = "FIREBASE_PROJECT_ID"
          value = var.firebase_project_id
        }
        env {
          name  = "FIREBASE_DATABASE_ID"
          value = var.firebase_database_id
        }
        # Note: GOOGLE_APPLICATION_CREDENTIALS is not needed on Cloud Run 
        # if using the default service account which has permissions.
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Allow public access
resource "google_cloud_run_service_iam_member" "public_access" {
  service  = google_cloud_run_service.backend_service.name
  location = google_cloud_run_service.backend_service.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "service_url" {
  value = google_cloud_run_service.backend_service.status[0].url
}
