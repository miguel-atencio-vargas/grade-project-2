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

module "backend" {
  source               = "./modules/backend"
  project_id           = var.project_id
  region               = var.region
  service_name         = var.backend_service_name
  image_name           = var.backend_image
  firebase_project_id  = var.project_id # Assuming same project
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
