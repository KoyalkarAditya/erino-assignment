import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Loader2, Pen, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as apiClient from "../apiClient";
import CreateContactDialog from "./CreateContactDialog";
import { useState } from "react";

type Props = {
  contacts: ContactType[];
};

type ContactType = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
};

const Contacts = ({ contacts }: Props) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(
    null
  );

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetAllContacts"] });
    },
  });
  const handleDelete = (id: string) => {
    mutate(id);
  };
  const handleUpdate = (contact: ContactType) => {
    setSelectedContact(contact);
    setIsOpen(true);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">SNo</TableCell>

              <TableCell>First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Company</TableCell>
              <TableCell align="right">Job Title</TableCell>
              <TableCell align="right">Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact, index) => (
              <TableRow
                key={contact.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {contact.firstName}
                </TableCell>
                <TableCell align="right">{contact.lastName}</TableCell>
                <TableCell align="right">{contact.email}</TableCell>
                <TableCell align="right">{contact.company}</TableCell>
                <TableCell align="right">{contact.jobTitle}</TableCell>
                <TableCell align="right">{contact.phoneNumber}</TableCell>
                <TableCell align="right">
                  <div className="flex gap-2 items-center">
                    <Pen
                      onClick={() => handleUpdate(contact)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    {isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin " />
                    ) : (
                      <Trash
                        onClick={() => handleDelete(contact.id)}
                        className="w-5 h-5 text-red-400 cursor-pointer"
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateContactDialog
        id={selectedContact?.id || null}
        contact={selectedContact}
        onClose={() => {
          setIsOpen(false);
          setSelectedContact(null);
        }}
        open={isOpen}
      />
    </>
  );
};

export default Contacts;
