import { client } from "@/api/client";
import { Role } from "sanity";

export const addRole = async (roleData: any) => {
  try {
    const newRole = await client.create({
      _type: "supplierRole",
      ...roleData,
    });
    return newRole;
  } catch (error) {
    console.error("Failed to create role:", error);
    throw error;
  }
};

// Function to update an existing role
export const editRole = async (roleId: any, roleData: any) => {
  try {
    const updatedRole = await client.patch(roleId).set(roleData).commit();
    return updatedRole;
  } catch (error) {
    console.error("Failed to update role:", error);
    throw error;
  }
};

// Function to delete a role
export const deleteRole = async (roleId: any) => {
  try {
    return await client.delete(roleId);
  } catch (error) {
    console.error("Failed to delete role:", error);
    throw error;
  }
};

// Function to fetch all roles
export const getAllRoles = async () => {
  try {
    const query = '*[_type == "supplierRole"]';
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch all roles:", error);
    throw error;
  }
};

// Function to fetch a single role
export const getSingleRole = async (roleId: any) => {
  try {
    const query = `*[_type == "supplierRole" && _id == $roleId][0]`;
    return await client.fetch(query, { roleId });
  } catch (error) {
    console.error("Failed to fetch single role:", error);
    throw error;
  }
};

// src/features/role/roleAPI.ts

export const getRolesBySupplier = async (supplierEthereumAddress: string) => {
  // Correctly use parameters in GROQ query
  const query = `
      *[_type == "supplierRole" && supplier->ethereumAddress == $supplierEthereumAddress]{
        ...,
        "user": supplier->{
          ...  
        }
      }
    `;

  const params = { supplierEthereumAddress };

  try {
    const roles = await client.fetch(query, params);

    return roles;
  } catch (error) {
    console.error("Error fetching roles from supplier:", error);
    throw error; // You can re-throw the error to be caught by the calling function
  }
};
