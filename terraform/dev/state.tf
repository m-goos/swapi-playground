terraform {
  backend "s3" {
    bucket  = "terraform-state-swapi-marc"
    key     = "terraform-swapi.tfstate"
    region  = "eu-central-1"
    encrypt = true
  }
}