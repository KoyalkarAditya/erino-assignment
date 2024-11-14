import express, { Request, Response } from "express";
import prisma from "../db/db";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * pageSize;
    const contacts = await prisma.contact.findMany({
      skip: skip,
      take: pageSize,
    });
    const totalContacts = await prisma.contact.count();

    res.status(200).json({
      contacts,
      pagination: {
        totalContacts,
        page,
        pageSize,
        totalPages: Math.ceil(totalContacts / pageSize),
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Error while getting contacts",
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } =
    req.body;

  try {
    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber: phoneNumber,
        company,
        jobTitle,
      },
    });
    res.status(200).json(contact);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Error creating the contact ",
    });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const updatedContact = await prisma.contact.update({
      where: {
        id,
      },
      data: req.body,
    });
    res.status(200).json(updatedContact);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Error while updating the contact",
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.contact.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Error while deleting the contact",
    });
  }
});

export default router;
