import { ContactType } from "./components/CreateContactDialog";

const BACKEND_URL = "http://localhost:3000";

export const createContact = async (data: ContactType) => {
  const response = await fetch(`${BACKEND_URL}/contacts`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong please try again");
  }
  return response.json();
};

export const updateContact = async ({
  data,
  id,
}: {
  data: ContactType;
  id: string;
}) => {
  const response = await fetch(`${BACKEND_URL}/contacts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong please try again");
  }
  return response.json();
};

export const deleteContact = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/contacts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Something went wrong please try again");
  }
  return response.json();
};

export const getAllContacts = async () => {
  const response = await fetch(`${BACKEND_URL}/contacts`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Something went wrong please try again");
  }
  return response.json();
};
