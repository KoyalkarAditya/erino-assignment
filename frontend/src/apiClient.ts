const BACKEND_URL = "http://localhost:3000";

export const createContact = async (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: number,
  company: string,
  jobTitle: string
) => {
  const response = await fetch(`${BACKEND_URL}/contacts`, {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle,
    }),
  });
  if (!response.ok) {
    throw new Error("Something went wrong please try again");
  }
  return response.json();
};

export const updateContact = async (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: number,
  company: string,
  jobTitle: string
) => {
  const response = await fetch(`${BACKEND_URL}/contacts`, {
    method: "PUT",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle,
    }),
  });
  if (!response.ok) {
    throw new Error("Something went wrong please try again");
  }
  return response.json();
};

export const deleteContact = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/contacts/${id}`, {
    method: "PUT",
  });
  if (!response.ok) {
    throw new Error("Something went wrong please try again");
  }
  return response.json();
};
