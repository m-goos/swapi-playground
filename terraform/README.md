# Terraform

## Setup

Now `terraform init` to set up the backend, then `terraform plan` giving in the variable file (`-var-file VARS.tfvars`), or just use the script: `chmod +x scripts/terraform-plan.sh` and to run: `./scripts/terraform-plan.sh`.

## Setting up remote backend: steps
*Personal notes to pick up for improving later*
- export AWS_PROFILE=my_profile
- Using AWS CLI, create S3 Bucket `aws s3api create-bucket --bucket terraform-state-swapi-marc --region eu-central-1 --create-bucket-configuration LocationConstraint=eu-central-1`
- Set server-side encryption: `aws s3api put-bucket-encryption --bucket  terraform-state-swapi-marc --server-side-encryption-configuration "{\"Rules\": [{\"ApplyServerSideEncryptionByDefault\":{\"SSEAlgorithm\": \"AES256\"}}]}"`
- Enable versioning: `aws s3api put-bucket-versioning --bucket terraform-state-swapi-marc --versioning-configuration Status=Enabled`
- Use DynamoDB to prevent concurrent writing and set up IAM for terraform (I skipped this for now)

Now set up the backend for S3 and create a simple main with the AWS Provider.
