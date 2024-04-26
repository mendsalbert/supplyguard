import { apiVersion, dataset, projectId, token } from "../../sanity/env";
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  useCdn: false, // set to `false` to bypass the edge cache
  token: token,
  apiVersion: apiVersion, // use current date (YYYY-MM-DD) to target the latest API version
});
