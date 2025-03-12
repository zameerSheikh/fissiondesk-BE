import express, { Request, Response } from 'express';
import { poolPromise } from "./db/db";

const app = express();
const PORT = process.env.PORT || 4200;

app.get("/", async (req: Request, res: Response) => {
  // res.send("Helloi, TypeScript with Express!");
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM departments");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});