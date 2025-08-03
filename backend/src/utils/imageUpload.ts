import {v2 as cloudinary} from "cloudinary";
import { Readable } from "stream";
import { config } from "dotenv";
config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadImageToCloudinary = (
    file: Buffer<ArrayBufferLike>
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
        },
        (error, result) => {
          if (error) {
            console.log("error", error);
            return reject(error);
          }
          if (result) {
            console.log("result", result);
            const data = {
              url: result.secure_url,
              id: result.public_id,
            };
            resolve(JSON.stringify(data));
          }
        }
      );
  
      Readable.from(file).pipe(stream);
    });
  };
export { uploadImageToCloudinary };