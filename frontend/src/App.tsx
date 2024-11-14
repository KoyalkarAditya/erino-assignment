import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";
import * as apiClient from "./apiClient";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Contacts from "./components/Contacts";
import { useState } from "react";
import CreateContactDialog, {
  ContactType,
} from "./components/CreateContactDialog";
import { useAppContext } from "./contexts/AppContext";

function App() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["GetAllContacts", page],
    queryFn: () => apiClient.getAllContacts(page),
    retry: false,
  });
  const { showToast } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createContact } = useMutation({
    mutationFn: apiClient.createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetAllContacts"] });
      showToast({
        type: "SUCCESS",
        message: "Contact created successfully!!",
      });
    },
    onError: () => {
      showToast({
        type: "ERROR",
        message: "Something went wrong please try again",
      });
    },
  });

  const handleCreateContact = (contact: ContactType) => {
    createContact(contact);
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />{" "}
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />{" "}
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />{" "}
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
      </Stack>
    );
  }
  if (isError) {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="my-5 ">
      <div className="w-full p-3 flex justify-end items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 rounded-xl px-4 py-2 text-white text-lg font-semibold"
        >
          Add Contact
        </button>
      </div>
      {data.contacts.length == 0 ? (
        <div className="text-center text-md ">
          You don&apos;t have any contacts .
        </div>
      ) : (
        <Contacts contacts={data.contacts} />
      )}
      <div className="fixed bottom-10 right-5">
        <div className="flex gap-2">
          {Array.from({ length: data.pagination.totalPages }).map(
            (__, index) => (
              <div
                key={index}
                onClick={() => setPage(index + 1)}
                className="px-4 py-2 cursor-pointer rounded-md bg-blue-400 text-white"
              >
                {index + 1}
              </div>
            )
          )}
        </div>
      </div>
      <CreateContactDialog
        onSave={handleCreateContact}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

export default App;
