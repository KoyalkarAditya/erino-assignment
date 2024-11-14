import { Dialog, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import * as apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type Props = {
  open: boolean;
  onClose: () => void;
  contact?: ContactType | null;
  id?: string | null;
};

export type ContactType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
};

const CreateContactDialog = ({ onClose, open, contact, id }: Props) => {
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ContactType>({
    defaultValues: contact
      ? {
          email: contact.email,
          lastName: contact.lastName,
          firstName: contact.firstName,
          company: contact.company,
          jobTitle: contact.jobTitle,
          phoneNumber: contact.phoneNumber,
        }
      : {},
  });
  const { mutate: createContact } = useMutation({
    mutationFn: apiClient.createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetAllContacts"] });
    },
    onError: () => {},
  });
  const { mutate: updateContact } = useMutation({
    mutationFn: apiClient.updateContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetAllContacts"] });
    },
    onError: () => {},
  });
  const onSubmit = (data: ContactType) => {
    if (id && contact) {
      updateContact({ data, id });
    } else {
      createContact(data);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <div className="font-bold text-blue-500">
          {id ? "Update Contact" : "Create Contact"}
        </div>
        <div className="p-2 min-w-[400px] flex justify-center items-center flex-col">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex gap-3 flex-col">
              <label className="flex text-lg flex-col gap-1 font-semibold">
                First Name{" "}
                <input
                  className="border-2 text-md font-normal py-1 px-3 rounded-xl"
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
              </label>
              {errors.firstName && (
                <div className="text-red-500 text-sm  w-fit px-2  rounded-xl">
                  {errors.firstName.message}
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-col">
              <label className="flex flex-col text-lg gap-1 font-semibold">
                Last Name{" "}
                <input
                  className="border-2 text-md font-normal py-1 px-3 rounded-xl"
                  type="text"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
              </label>
              {errors.lastName && (
                <div className="text-red-500 text-sm  w-fit px-2  rounded-xl">
                  {errors.lastName.message}
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-col">
              <label className="flex flex-col gap-1 text-lg font-semibold">
                Email{" "}
                <input
                  className="border-2 text-md font-normal py-1 px-3 rounded-xl"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </label>
              {errors.email && (
                <div className="text-red-500 text-sm  w-fit px-2  rounded-xl">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-col">
              <label className="flex flex-col gap-1 text-lg font-semibold">
                Phone Number{" "}
                <input
                  className="border-2 text-md font-normal py-1 px-3 rounded-xl"
                  type="text"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be 10 digits",
                    },
                  })}
                />
              </label>
              {errors.phoneNumber && (
                <div className="text-red-500 text-sm  w-fit px-2  rounded-xl">
                  {errors.phoneNumber.message}
                </div>
              )}
            </div>{" "}
            <div className="flex gap-2 flex-col">
              <label className="flex flex-col gap-1 text-lg font-semibold">
                Company{" "}
                <input
                  className="border-2 text-md font-normal py-1 px-3 rounded-xl"
                  type="text"
                  {...register("company", {
                    required: "Company is required",
                  })}
                />
              </label>
              {errors.company && (
                <div className="text-red-500 text-sm  w-fit px-2  rounded-xl">
                  {errors.company.message}
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-col">
              <label className="flex flex-col gap-1 text-lg font-semibold">
                Job Title{" "}
                <input
                  className="border-2 text-md font-normal py-1 px-3 rounded-xl"
                  type="text"
                  {...register("jobTitle", {
                    required: "Job title is required",
                  })}
                />
              </label>
              {errors.jobTitle && (
                <div className="text-red-500 text-sm  w-fit px-2  rounded-xl">
                  {errors.jobTitle.message}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-xl mt-4"
            >
              {id ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </DialogTitle>
    </Dialog>
  );
};

export default CreateContactDialog;
