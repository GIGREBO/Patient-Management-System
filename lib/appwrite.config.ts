import * as sdk from "node-appwrite";

const client = new sdk.Client();

// Constants that need to be exported
export const ENDPOINT = 'https://cloud.appwrite.io/v1';
export const PROJECT_ID = '673912650038f346bbdc';
export const DATABASE_ID = '673912ca00210711795a';
export const BUCKET_ID = '67391463001fcf9d8737';
export const PATIENT_COLLECTION_ID = '67391315003444cafa41';
export const APPOINTMENT_COLLECTION_ID = '67391343000175c5ffe0';
export const DOCTOR_COLLECTION_ID = '6739132f002bc9cc0e87';

client
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey('standard_5d724d6c72f0532f13fe53b01ec6a2c855d76ed7f304c482a1d7be7b21f6121009e9141fbe5b96c03a5335aa7536416c1273fd746a7a800819269aa2c1b895f2d5b43e57c814701cf9f46bcfe90a055de0bcdbb5565f0d129fab1f5e01b0c9c43f3522491ff33c540b8bffd10abb2e2e1015f3fc56689b1261894edb4f8569b8');

// Services that need to be exported
export const users = new sdk.Users(client);
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);

export default client;