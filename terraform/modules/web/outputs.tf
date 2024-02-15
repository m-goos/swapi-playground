output "cloudfront_distribution_domain" {
  description = "HTTPS Domain of the cloudfront distribution"
  value       = aws_cloudfront_distribution.www.domain_name
}

output "s3_bucket_name" {
  description = "Name of the website bucket"
  value = aws_s3_bucket.website-bucket.bucket
}