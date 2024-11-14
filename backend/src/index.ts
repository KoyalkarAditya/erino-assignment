import express from "express";
import cors from "cors";

import ContactsRoute from "./routes/contacts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contacts", ContactsRoute);

app.listen(3000, () => console.log("server started at port 3000"));
