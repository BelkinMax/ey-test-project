import { setAttributes } from "@/helpers/Utils";

export default class Photo {
  albumId = null;
  id = null;
  title = "";
  url = "";
  thumbnailUrl = "";

  constructor(attributes) {
    if (attributes) {
      setAttributes(attributes, this);
    }
  }
}
