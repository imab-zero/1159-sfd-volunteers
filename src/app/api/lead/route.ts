import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n"
);
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = "Sheet1"; // Make sure this matches your sheet name

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const state = formData.get("state") as string;
    const city = formData.get("city") as string;
    const university = formData.get("university") as string;
    const department = formData.get("department") as string;
    const availability = formData.get("availability") as string;
    const roles = formData.get("roles") as string;

    // Basic validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (
      !fullName ||
      !phone ||
      !state ||
      !city ||
      !university ||
      !department ||
      !availability
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
      console.warn("⚠️ Google Sheets not configured properly");
      return NextResponse.json(
        {
          success: false,
          error: "Google Sheets not configured. Check .env.local",
        },
        { status: 500 }
      );
    }

    // Authenticate with Google Sheets API
    const auth = new google.auth.JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Fetch existing rows (email is in column A)
    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A2:A`, // Skip header row
    });

    const rows = readRes.data.values || [];

    // Check if email exists (case-insensitive)
    const emailExists = rows.some(
      (row) => row[0]?.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExists) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Append new row
    const timestamp = new Date().toISOString();
    const volunteerRoles = roles
      ? JSON.parse(roles).join(", ")
      : "None selected";

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:K`,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            email.trim(),
            fullName.trim(),
            timestamp,
            "Volunteers",
            phone.trim(),
            state.trim(),
            city.trim(),
            university.trim(),
            department.trim(),
            availability.trim(),
            volunteerRoles,
          ],
        ],
      },
    });

    console.log("✅ Successfully posted to Google Sheets");

    return NextResponse.json(
      {
        success: true,
        message: "Successfully registered as a volunteer!",
        data: {
          email: email.trim(),
          fullName: fullName.trim(),
          phone: phone.trim(),
          state: state.trim(),
          city: city.trim(),
          university: university.trim(),
          department: department.trim(),
          availability: availability.trim(),
          roles: volunteerRoles,
          timestamp,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "working",
    message: "Lead registration API is functional",
    sheetId: GOOGLE_SHEET_ID,
  });
}
