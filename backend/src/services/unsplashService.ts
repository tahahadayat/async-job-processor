import { createApi } from "unsplash-js";
import { Random } from "unsplash-js/dist/methods/photos/types";
import secrets from "../../secrets";

const unsplash = createApi({
  accessKey: secrets.unsplash_access_key,
});

class UnsplashService {
  async getRandomFoodPhoto() {
    const response = await unsplash.photos.getRandom({ query: "food" });
    return response?.response as Random;
  }
}

export default UnsplashService;
