import { client } from "../../api/client";
export const fetchCategories = async () => {
  const query = '*[_type == "category"]';
  try {
    const categories = await client.fetch('*[_type == "category"]');
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Failed to fetch categories");
  }
};
