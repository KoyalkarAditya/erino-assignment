import { useQuery } from "@tanstack/react-query";
import "./App.css";
import * as apiClient from "./apiClient";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Contacts from "./components/Contacts";
import { useState } from "react";
import CreateContactDialog from "./components/CreateContactDialog";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["GetAllContacts"],
    queryFn: apiClient.getAllContacts,
    retry: false,
  });
  const [isOpen, setIsOpen] = useState(false);
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
      <Contacts contacts={data} />
      <CreateContactDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default App;
