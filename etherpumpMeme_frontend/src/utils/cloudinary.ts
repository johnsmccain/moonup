import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { quality, format } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/format";


new CloudinaryImage("landmannalaugar_iceland.jpg")
  .resize(scale().width(1000))
  .delivery(quality(35))
  .delivery(format(auto()));