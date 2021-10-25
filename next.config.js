module.exports = {
  images: {
    domains: [
      `s3.eu-central-1.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`
    ],
  },
}