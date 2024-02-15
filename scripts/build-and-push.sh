export AWS_PROFILE=personal_marc
echo "AWS Profile set to: ${AWS_PROFILE}"
export CLOUDFRONT_ID=E26CG5RWS0JMM7
echo "AWS Profile set to: ${CLOUDFRONT_ID}"

echo "cd ../"
cd ../

echo "🛠  running build "
npm run build
# TODO add cleanup step to sync, JS bundles are piling up now
echo "🚀  uploading to S3 "
aws s3 sync build/ s3://swapi-development

echo "🧨  creating cloudfront invalidation"
aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"

echo "✅  finished running script - check the logs."