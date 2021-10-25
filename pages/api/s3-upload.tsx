// pages/api/s3-upload.js
import { APIRoute } from 'next-s3-upload';

export default APIRoute.configure({
  key(req, filename) {
    return `uploads/stories/${filename.toLowerCase()}`;
  },
});