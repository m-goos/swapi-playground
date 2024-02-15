locals {
  project_name = "swapi-${var.environment}"
  s3_origin_id = "swapi-s3-origin"
}

resource "aws_cloudfront_origin_access_identity" "cloudfront-origin-access-id" {
  comment = "S3 Access ${local.project_name}"
}

resource "aws_cloudfront_distribution" "www" {
  default_root_object = "index.html"
  enabled             = true
  comment             = "Frontend ${local.project_name}"
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"

  origin {
    domain_name = aws_s3_bucket.website-bucket.bucket_regional_domain_name
    origin_id   = local.project_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.cloudfront-origin-access-id.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.project_name
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  logging_config {
    include_cookies = false
    bucket          = "${local.project_name}.s3.amazonaws.com"
    prefix          = "cloudfront_logs"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }
}
