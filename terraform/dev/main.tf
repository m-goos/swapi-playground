provider "aws" {
  region = var.aws_region
}

module "web" {
  source = "./../modules/web"
  environment = var.environment
}