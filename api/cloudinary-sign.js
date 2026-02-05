import crypto from "crypto";

export default function handler(req, res) {
  // Optional PIN gate
  const pin = process.env.UPLOAD_MENU_PIN;
  if (pin && req.query.pin !== pin) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const timestamp = Math.floor(Date.now() / 1000);

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // Force a single target asset: roty/menu
  const paramsToSign =
    `folder=roty&invalidate=true&overwrite=true&public_id=menu&timestamp=${timestamp}`;

  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + apiSecret)
    .digest("hex");

  res.status(200).json({
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder: "roty",
    publicId: "menu",
  });
}
