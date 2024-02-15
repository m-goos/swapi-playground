resource "aws_s3_bucket" "website-bucket" {
  bucket = local.project_name
  tags = {
  Name = local.project_name }
}

resource "aws_s3_bucket_website_configuration" "website-configuration" {
  bucket = aws_s3_bucket.website-bucket.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket = aws_s3_bucket.website-bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "no-public-access" {
  bucket = aws_s3_bucket.website-bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website-bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.cloudfront-origin-access-id.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "swapi-bucket-policy" {
  bucket = aws_s3_bucket.website-bucket.id
  policy = data.aws_iam_policy_document.s3_policy.json
}
