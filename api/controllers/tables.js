const { sql } = require("@vercel/postgres");

async function createOrdersTable() {
  // Check if the table already exists
  const tableCheckQuery = `
    SELECT to_regclass('public.orders') AS table_exists;
    `;

  const { rows } = await sql(tableCheckQuery);
  const tableExists = rows[0].table_exists !== null;

  // If the table doesn't exist, create it
  if (!tableExists) {
    const createTableQuery = `
        CREATE TABLE orders (
            Id SERIAL PRIMARY KEY,
            OrderID VARCHAR,
            TypeOfPaper VARCHAR,
            TaskLevel VARCHAR,
            SelectSubject VARCHAR,
            ReferencingStyle VARCHAR,
            NoOfSources VARCHAR,
            PaperStandard VARCHAR,
            PreferredLanguage VARCHAR,
            NoOfPages VARCHAR,
            PaperFormat VARCHAR,
            Deadline VARCHAR,
            Topic VARCHAR,
            UserName VARCHAR,
            UserEmail VARCHAR,
            UserPhone VARCHAR,
            Country VARCHAR,
            PostalCode VARCHAR,
            UserInfo VARCHAR,
            TotalAmount VARCHAR,
            PricePerPage VARCHAR,
            CurrencyUnit VARCHAR,
            CreatedAt TIMESTAMP DEFAULT NOW(),
            UpdatedAt TIMESTAMP DEFAULT NOW()
        );
        `;

    await sql(createTableQuery);
    console.log('Table "orders" created successfully.');
  } else {
    console.log('Table "orders" already exists. No action taken.');
  }
}
module.exports = createOrdersTable;
