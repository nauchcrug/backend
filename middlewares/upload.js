const multer = require('multer');
const storage = multer.memoryStorage();

const uploadMiddleware = multer({
  storage
}).single('image');

function uploadMiddlewareFactory() {
  return uploadMiddleware;
}

module.exports = uploadMiddlewareFactory;
