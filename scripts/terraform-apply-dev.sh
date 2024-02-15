export AWS_PROFILE=personal_marc
echo "AWS Profile set to: ${AWS_PROFILE}"
echo "cd ../"
cd ../terraform/dev/

echo "terraform init, then terraform apply"
terraform init -var-file="variables.tfvars"
terraform apply -var-file="variables.tfvars"