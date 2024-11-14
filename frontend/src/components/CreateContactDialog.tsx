import { Dialog, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
type Props = {
  open: boolean;
  onClose: () => void;
  contact?: ContactType | null;
  onSave: (data: ContactType) => void;
};

export type ContactType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
  id: string;
};

const CreateContactDialog = ({ onClose, open, contact, onSave }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ContactType>();
  useEffect(() => {
    reset({
      firstName: contact?.firstName || "",
      lastName: contact?.lastName || "",
      email: contact?.email || "",
      company: contact?.company || "",
      jobTitle: contact?.jobTitle || "",
      phoneNumber: contact?.phoneNumber || "",
      id: contact?.id || "",
    });
  }, [contact, onSave]);

  const onSubmit = (data: ContactType) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <div className="font-bold text-blue-500">
          {contact ? "Update Contact" : "Create Contact"}
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
              {contact ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </DialogTitle>
    </Dialog>
  );
};

export default CreateContactDialog;
