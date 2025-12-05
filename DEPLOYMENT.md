# GCP Deployment Guide (Terraform + GitHub Actions)

This guide explains how to deploy the application to Google Cloud Platform using Terraform and GitHub Actions.

## Architecture
- **Frontend:** Static Next.js site hosted in a **Google Cloud Storage Bucket**.
- **Backend:** NestJS API hosted on **Google Cloud Run**.
- **Database:** **Cloud Firestore** (managed via Firebase).
- **Infrastructure:** Managed via **Terraform**.
- **CI/CD:** Automated via **GitHub Actions**.

## Prerequisites
1.  **GCP Project:** Ensure you have a GCP project with billing enabled.
2.  **APIs Enabled:** Enable the following APIs in your GCP Project:
    - Cloud Run API
    - Compute Engine API
    - Cloud Storage API
    - IAM API
    - Artifact Registry API

## Setup Instructions

### 1. Create a Service Account for GitHub Actions
Since Terraform runs in GitHub Actions, it needs a Service Account with high privileges (Editor role) to provision resources.

1.  Go to **IAM & Admin** > **Service Accounts** in GCP Console.
2.  Create a new Service Account (e.g., `github-deployer`).
3.  Grant it the **Editor** role (or more granular roles: Cloud Run Admin, Storage Admin, Service Account User, Artifact Registry Admin).
4.  Create a **JSON Key** for this service account and download it.

### 2. Configure GitHub Secrets
Go to your GitHub Repository > **Settings** > **Secrets and variables** > **Actions** and add the following secrets:

| Secret Name | Value |
|-------------|-------|
| `GCP_PROJECT_ID` | Your GCP Project ID (e.g., `alert-condition-477917-k0`) |
| `GCP_SA_KEY` | The content of the JSON Key file you downloaded |
| `FIREBASE_PROJECT_ID` | Your Firebase Project ID (usually same as GCP) |
| `FIREBASE_DATABASE_ID` | `test-db` (or your database ID) |
| `NEXT_PUBLIC_API_URL` | *Leave empty for now (see below)* |

### 3. Initial Deployment
Push the `main` branch to GitHub to trigger the workflows.

1.  **Infrastructure Deployment:**
    - The `Deploy Infrastructure` workflow will run `terraform apply`.
    - This creates the GCS Bucket, Cloud Run Service (placeholder), and Artifact Registry.

2.  **Backend Deployment:**
    - The `Deploy Backend` workflow will build the Docker image and deploy it to Cloud Run.
    - **Check the Output:** Once finished, go to Cloud Run console or check logs to get the **Service URL** (e.g., `https://backend-api-xyz.a.run.app`).

3.  **Update Frontend Configuration:**
    - Go back to GitHub Secrets.
    - Set `NEXT_PUBLIC_API_URL` to the Backend Service URL (e.g., `https://backend-api-xyz.a.run.app/api/v1`).

4.  **Frontend Deployment:**
    - Re-run the `Deploy Frontend` workflow (or push a change).
    - It will build the static site with the correct API URL and upload it to the GCS Bucket.

### 4. Access the Application
- The Frontend URL will be the GCS Bucket URL (e.g., `http://YOUR_PROJECT_ID-frontend.storage.googleapis.com/index.html`).
- **Note:** GCS Website hosting is HTTP only. For HTTPS and a custom domain, you should set up a **Cloud Load Balancer** pointing to this bucket (Terraform module can be extended for this).

## Terraform State
The Terraform state is configured to be stored in a GCS bucket (`terraform-state-bucket`).
**Important:** You must create this bucket manually first or update `terraform/main.tf` to use a local backend if you prefer not to use remote state initially.
*Current config assumes a bucket named `terraform-state-bucket` exists. You should update `terraform/main.tf` with a unique bucket name.*

\`\`\`hcl
# terraform/main.tf
backend "gcs" {
  bucket = "your-unique-terraform-state-bucket" # <--- UPDATE THIS
  prefix = "terraform/state"
}
\`\`\`
