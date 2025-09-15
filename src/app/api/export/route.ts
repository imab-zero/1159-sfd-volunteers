import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import * as XLSX from "xlsx";

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n"
);
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = "Sheet1";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "csv";

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
      return NextResponse.json(
        { error: "Google Sheets not configured properly" },
        { status: 500 }
      );
    }

    // Authenticate with Google Sheets API
    const auth = new google.auth.JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Fetch all data from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:K`, // Adjusted range to cover all columns
    });

    const rows = response.data.values || [];

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "No data found in the spreadsheet" },
        { status: 404 }
      );
    }

    const headers = [
      "Email",
      "Name",
      "Timestamp",
      "Source",
      "Phone",
      "State",
      "City",
      "University",
      "Department",
      "Availability",
      "VolunteerRoles",
    ];

    // Convert rows to objects based on headers
    const data = rows.slice(1).map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header] = row[i] || "";
      });
      return obj;
    });

    const filename = `school-for-the-daring-leads-${
      new Date().toISOString().split("T")[0]
    }`;

    if (format === "csv") {
      const csvRows = [
        headers.join(","),
        ...data.map((row) =>
          headers
            .map((h) => `"${(row[h] || "").replace(/"/g, '""')}"`)
            .join(",")
        ),
      ].join("\n");

      return new NextResponse(csvRows, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${filename}.csv"`,
        },
      });
    }

    if (format === "xlsx") {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });
      XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

      const buffer = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
      });

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${filename}.xlsx"`,
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid format. Use 'csv' or 'xlsx'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ Export Error:", error);
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  }
}
