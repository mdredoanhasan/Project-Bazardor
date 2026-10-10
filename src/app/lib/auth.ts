import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.BETTER_AUTH_MONGODB_URL;
const googleClientId = process.env.BETTER_AUTH_GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET;

if (!mongoUrl) {
  throw new Error("BETTER_AUTH_MONGODB_URL is not defined");
}

if (!googleClientId || !googleClientSecret) {
  throw new Error(
    "BETTER_AUTH_GOOGLE_CLIENT_ID and BETTER_AUTH_GOOGLE_CLIENT_SECRET must be defined",
  );
}

const client = new MongoClient(mongoUrl);
const db = client.db("BazarDor");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
