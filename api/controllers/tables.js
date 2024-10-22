const { sql } = require("@vercel/postgres");

async function createOrdersTable() {
  try {
    // Check if the table already exists
    const { rows } = await sql`
      SELECT to_regclass('public.orders') AS table_exists;
    `;
    const tableExists = rows[0].table_exists !== null;

    // If the table doesn't exist, create it
    if (!tableExists) {
      await sql`
        CREATE TABLE orders (
          "Id" SERIAL PRIMARY KEY,
          "OrderID" VARCHAR(255),
          "TypeOfPaper" VARCHAR(255),
          "TaskLevel" VARCHAR(255),
          "SelectSubject" VARCHAR(255),
          "ReferencingStyle" VARCHAR(255),
          "NoOfSources" VARCHAR(50),
          "PaperStandard" VARCHAR(255),
          "PreferredLanguage" VARCHAR(255),
          "NoOfPages" VARCHAR(50),
          "PaperFormat" VARCHAR(255),
          "Deadline" VARCHAR(255),
          "Topic" VARCHAR(255),
          "UserName" VARCHAR(255),
          "UserEmail" VARCHAR(255),
          "UserPhone" VARCHAR(50),
          "Country" VARCHAR(255),
          "PostalCode" VARCHAR(50),
          "UserInfo" TEXT,
          "TotalAmount" VARCHAR(50),
          "PricePerPage" VARCHAR(50),
          "CurrencyUnit" VARCHAR(50),
          "CreatedAt" TIMESTAMP DEFAULT NOW(),
          "UpdatedAt" TIMESTAMP DEFAULT NOW()
        );
      `;

      console.log('Table "orders" created successfully.');
    } else {
      console.log('Table "orders" already exists. No action taken.');
    }
  } catch (error) {
    console.error("Error creating table:", error.message);
  }
}

module.exports = createOrdersTable;
