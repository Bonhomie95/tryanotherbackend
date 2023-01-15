import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from "path"


type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void



const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, "public");
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.originalname + "-" + uniqueSuffix);
  }
})


const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  let ext = path.extname(file.originalname);
  if (
    ext !== ".png" &&
    ext !== ".jpg" &&
    ext !== ".jpeg" &&
    ext !== ".mp4" &&
    ext !== ".gif" &&
    ext !== ".avi" &&
    ext !== ".wmv" &&
    ext !== ".3gp" &&
    ext !== ".mkv" &&
    ext !== ".mp3" &&
    ext !== ".m4a"
  ) {
    callback(new Error(`unsupported file format`));
  }
  callback(null, true);
}


const upload = multer({
  storage: storage
});



export default upload