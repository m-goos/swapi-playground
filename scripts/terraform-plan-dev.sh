export AWS_PROFILE=personal_marc
echo "AWS Profile set to: ${AWS_PROFILE}"
echo "cd ../"
cd ../terraform/dev/

echo "terraform init, then terraform plan"
terraform init -var-file="variables.tfvars"
terraform plan -var-file="variables.tfvars"