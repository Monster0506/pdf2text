# PDF Text Extraction API

This API allows you to extract text from a PDF file provided by a URL. The service downloads the PDF from the specified URL, extracts its text content, and returns it in JSON format. It is built with Node.js, Express, and uses `pdf-parse` for parsing PDF content.

## Prerequisites

- Node.js (v12+ recommended)
- Internet connection for accessing remote PDFs

## Setup

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install express axios pdf-parse
   ```

3. Run the server:

   ```bash
   node server.js
   ```

   By default, the server runs on port `3008`. To change the port, set the `PORT` environment variable.

## Usage

To use the API, make a `GET` request to the `/extract-pdf` endpoint with a `url` query parameter containing the direct URL of the PDF you want to process.

### Endpoint

- **GET** `/extract-pdf`
  - **Query Parameters:**
    - `url` (required): Direct URL of the PDF file.

### Example Request

```http
GET http://localhost:3008/extract-pdf?url=https://example.com/sample.pdf
```

### Example Response

If the request is successful, the response will be a JSON object containing the extracted text from the PDF.

```json
{
  "text": "Extracted text content of the PDF..."
}
```

### Error Handling

- **400 Bad Request**: Returned if the `url` query parameter is missing.
- **500 Internal Server Error**: Returned if there is an issue fetching or processing the PDF.

## Logging

The API includes various log levels for easy debugging:

- `[INFO]` for general operation messages (e.g., starting the server, fetching the PDF).
- `[DEBUG]` for showing the first 500 characters of the extracted text.
- `[ERROR]` for failures, including stack traces for detailed troubleshooting.

## Dependencies

- **express**: For handling HTTP requests.
- **axios**: For fetching the PDF from a remote URL.
- **pdf-parse**: For parsing the PDF and extracting text content.

## License

This project is open-source and freely available for use and modification.

## Notes

- Ensure the PDF URL is accessible publicly and does not require authentication.
- The server only processes PDFs in binary format, so URLs must point directly to PDF files.
