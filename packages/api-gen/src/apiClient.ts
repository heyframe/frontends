import { createAPIClient, createAdminAPIClient } from "@heyframe/api-client";
import type { operations as adminOperations } from "@heyframe/api-client/admin-api-types";
import type { operations } from "@heyframe/api-client/api-types";

let adminApiClient: ReturnType<typeof createAdminAPIClient<adminOperations>>;
let frontApiClient: ReturnType<typeof createAPIClient<operations>>;

export function getAdminApiClient() {
  if (!adminApiClient) {
    adminApiClient = createAdminAPIClient<adminOperations>({
      baseURL: `${process.env.OPENAPI_JSON_URL}/api`,
      credentials: {
        grant_type: "password",
        client_id: "administration",
        scopes: "write",
        username: process.env.HEYFRAME_ADMIN_USERNAME || "",
        password: process.env.HEYFRAME_ADMIN_PASSWORD || "",
      },
    });
  }
  return adminApiClient;
}

export function getStoreApiClient() {
  if (!frontApiClient) {
    frontApiClient = createAPIClient<operations>({
      baseURL: `${process.env.OPENAPI_JSON_URL}/front-api`,
      accessToken: process.env.OPENAPI_ACCESS_KEY,
    });
  }
  return frontApiClient;
}
