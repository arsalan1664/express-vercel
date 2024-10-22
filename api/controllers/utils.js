const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");

// ********* Prisma ********//
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const db = prisma;

// ********* Nodemailer ********//
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "support@gradesup.org",
    pass: "#MmeProduct@UPGrades@1109",
  },
});

module.exports = { db, transporter };
