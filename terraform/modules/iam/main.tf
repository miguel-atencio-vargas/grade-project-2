variable "project_id" {}

resource "google_service_account" "github_actions" {
  account_id   = "github-actions-deployer"
  display_name = "GitHub Actions Deployer"
}

# Grant permissions to the service account
# Note: For production, use more granular roles.
resource "google_project_iam_member" "editor" {
  project = var.project_id
  role    = "roles/editor"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

output "service_account_email" {
  value = google_service_account.github_actions.email
}
