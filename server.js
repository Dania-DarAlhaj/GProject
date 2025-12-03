const sql = require("mssql/msnodesqlv8");


const config = {
    database: "weddingPlanning",
    server: "localhost\\SQLEXPRESS",
    driver: "ODBC Driver 18for SQL Server",  // بالضبط الاسم الموجود عندك
    options: {
        
        trustedConnection: true,
        trustServerCertificate: true
    }
};


const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/users", async (req, res) => {
    const { name, phone, city, email, password } = req.body;

    try {
        await sql.connect(config);
        await sql.query`INSERT INTO [users] (name, phone, city, email, password)
                        VALUES (${name}, ${phone}, ${city}, ${email}, ${password})`;
        res.json({ message: "User saved successfully!" });
    } catch (err) {
        console.error("DB ERROR:", err);
        res.status(500).json({ error: "Database Error", details: err.message });
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
