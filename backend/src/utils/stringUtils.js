import crypto from "crypto";

export const stringUtils = {
  randomString: (length = 16) =>
    crypto.randomBytes(length).toString("hex").slice(0, length),

  capitalize: (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),

  slugify: (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
};
