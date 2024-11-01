// server.js
const express = require("express");
const axios = require("axios");
const pdfParse = require("pdf-parse");
const app = express();
const port = process.env.PORT || 3008;

app.get("/extract-pdf", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    console.log("[ERROR] No URL provided in query parameters");
    return res
      .status(400)
      .send("Error: Please provide a PDF URL as 'url' query parameter.");
  }

  console.log("[INFO] Starting PDF extraction for URL:", url);

  try {
    console.log("[INFO] Sending request to fetch PDF...");
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const pdfBuffer = Buffer.from(response.data, "binary");
    console.log(
      "[INFO] PDF fetched successfully. Buffer length:",
      pdfBuffer.length,
    );

    console.log("[INFO] Beginning text extraction with pdf-parse...");
    const data = await pdfParse(pdfBuffer);
    console.log("[SUCCESS] PDF text extracted successfully.");

    // Logging extracted text for debugging
    console.log("[DEBUG] Extracted Text:", data.text.substring(0, 500) + "..."); // First 500 characters

    res.json({ text: data.text });
  } catch (error) {
    console.error("[ERROR] Failed to process PDF:", error.message);
    console.error("[STACK TRACE]", error.stack);
    res.status(500).send("Error processing PDF.");
  }
});

app.listen(port, () => {
  console.log(`[INFO] PDF extraction server running on port ${port}`);
});
