import DBConnection from "../config/mySQL.js";
import cloudinary from "../config/cloudinary.js";

export const addSchool = async (req, res) => {
  const { name, address, city, state, contact, email } = req.body;
  const image = req.file;
  let imageURL = "";

  try {
    if (!name || !address || !city || !state || !contact || !email || !image) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: "schoolImages",
      });
      imageURL = result.secure_url;
    }

    const sql = `
  INSERT INTO schools_data (name, address, city, state, contact, email_id, image)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

    const data = DBConnection.query(
      sql,
      [name, address, city, state, contact, email, imageURL],
      (err, results) => {
        if (err) {
          console.error("Error adding school:", err);
          return res.json({ success: false, message: "Database error" });
        }
        if (results.affectedRows > 0) {
          return res.json({
            success: true,
            id: results.insertId,
          });
        }
      }
    );
  } catch (error) {
    console.error("Error adding school:", error);
    res.json({ success: false, message: "Server error: " + error.message });
  }
};

export const getSchools = async (req, res) => {
  try {
    const query = "SELECT * FROM schools_data";
    DBConnection.query(query, (err, result) => {
      if (err) {
        return res.json({ success: false, Message: "Database error" });
      }
      if (result) {
        return res.json({ success: true, data: result });
      }
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
