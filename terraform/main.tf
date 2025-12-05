terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.0.0"
    }
  }
  backend "gcs" {
    # The bucket name will be passed via CLI or partial config
    bucket = "terraform-state-bucket-42"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

module "frontend" {
  source      = "./modules/frontend"
  project_id  = var.project_id
  region      = var.region
  bucket_name = var.frontend_bucket_name
}

module "artifact_registry" {
  source     = "./modules/artifact_registry"
  project_id = var.project_id
  region     = var.region
}

module "backend" {
  source               = "./modules/backend"
  project_id           = var.project_id
  region               = var.region
  service_name         = var.backend_service_name
  # Use a public placeholder image for initial deployment to avoid "image not found" error
  # The actual app image will be deployed by the "Deploy Backend" workflow
  image_name           = "us-docker.pkg.dev/cloudrun/container/hello" 
  firebase_project_id  = var.project_id
  firebase_database_id = var.firebase_database_id
}

module "iam" {
  source     = "./modules/iam"
  project_id = var.project_id
}

output "frontend_url" {
  value = module.frontend.bucket_url
}

output "backend_url" {
  value = module.backend.service_url
}
