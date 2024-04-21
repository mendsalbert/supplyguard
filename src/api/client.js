import { apiVersion, dataset, projectId } from "../../sanity/env";
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: apiVersion, // use current date (YYYY-MM-DD) to target the latest API version
});
