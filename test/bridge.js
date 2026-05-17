import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import axios from "axios";

const port = new SerialPort({
  path: "COM5",
  baudRate: 9600
});

const parser = port.pipe(
  new ReadlineParser({ delimiter: "\r\n" })
);

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjFkNWQ4MWRjZWVkNTVmYjI4OGI5MyIsImlhdCI6MTc3ODc2MzI1MiwiZXhwIjoxNzc5MzY4MDUyfQ.5_w9N5hDGZqsYxpI5fa1HImdLldOh9WHNiR_GrCnHto";

parser.on("data", async (raw) => {
  const data = raw.trim();

  if (data === "Sensor Started" || data === "ERROR") return;

  const distance = parseFloat(data);

  if (isNaN(distance)) return;

  console.log("Distance:", distance);

  try {
    await axios.post(
      "http://localhost:5000/api/water/update",
      { distance },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    console.log("Sent to local backend");
  } catch (err) {
    console.log("Error:", err.message);
  }
});