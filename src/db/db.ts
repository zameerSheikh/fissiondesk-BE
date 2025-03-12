import sql, { config } from "mssql";
import dotenv from "dotenv";

dotenv.config();

const dbConfig: config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'localhost,1433',
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  options: {
    encrypt: process.env.DB_ENCRYPT === "true", // Required for Azure SQL
    trustServerCertificate: true, // Set to false in production
  },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("✅ Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("❌ Database connection failed!", err);
    process.exit(1);
  });

export { sql, poolPromise };
