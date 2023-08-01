import cloudinary from "cloudinary";
import { IncomingForm } from "formidable";
import { csrf } from "../../../CSRF/csrf_setup";

// Configuration
cloudinary.config({
  cloud_name: "dicczqmkf",
  api_key: "925565169647495",
  api_secret: "C8M8mB3L_lWmOpOUwhzlbGzZiEA",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const file = data?.files?.inputFile.filepath;
  try {
    const response = await cloudinary.v2.uploader.upload(file, {
      resource_type: "auto",
      public_id: data?.public_id,
    });
    return res.json(response);
  } catch (error) {
    console.log("Error", error);
    return res.json(error);
  }
};

