import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SPREADSHEET_ID = "1dM0JB6WBgQ4AQxhbmCAa6u4oPSkTHPB0MFk0_xGRk6Y";
const SHEET_NAME = "CogoChat CRM";

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not set");
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

// GET — search rows by business name for the update mode
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("q") || "").toLowerCase().trim();

  if (!query) {
    return NextResponse.json({ rows: [] });
  }

  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${SHEET_NAME}'!A2:P1000`,
    });

    const rows = res.data.values || [];

    const matches = rows
      .map((row, index) => ({ row, index: index + 2 })) // +2 because data starts at row 2
      .filter(({ row }) => {
        const businessName = (row[1] || "").toLowerCase();
        return businessName.includes(query);
      })
      .slice(0, 10)
      .map(({ row, index }) => ({
        rowIndex: index,
        dateAdded:    row[0]  || "",
        businessName: row[1]  || "",
        contactName:  row[2]  || "",
        phone:        row[3]  || "",
        email:        row[4]  || "",
        location:     row[5]  || "",
        leadSource:   row[6]  || "",
        status:       row[7]  || "",
        service:      row[8]  || "",
        dealValue:    row[9]  || "",
        monthlyValue: row[10] || "",
        notes:        row[13] || "",
      }));

    return NextResponse.json({ rows: matches });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST — add a new lead or update an existing one
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, rowIndex, ...fields } = body;

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    if (mode === "add") {
      const today = new Date().toLocaleDateString("en-GB");
      const newRow = [
        today,
        fields.businessName  || "",
        fields.contactName   || "",
        fields.phone         || "",
        fields.email         || "",
        fields.location      || "",
        fields.leadSource    || "",
        fields.status        || "New",
        fields.service       || "",
        fields.dealValue     || "",
        fields.monthlyValue  || "",
        "", // One Off Commission — formula set by setup-crm.js
        "", // Monthly Commission — formula set by setup-crm.js
        fields.notes         || "",
        "", // Proposal Sent Date
        "", // Close Date
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${SHEET_NAME}'!A:P`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [newRow] },
      });

      return NextResponse.json({ ok: true, message: "Lead added." });
    }

    if (mode === "update") {
      if (!rowIndex) {
        return NextResponse.json({ error: "rowIndex is required for update mode" }, { status: 400 });
      }

      // Update Status (col H = column 8, 1-indexed) and Notes (col N = column 14)
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          valueInputOption: "USER_ENTERED",
          data: [
            {
              range: `'${SHEET_NAME}'!H${rowIndex}`,
              values: [[fields.status || ""]],
            },
            {
              range: `'${SHEET_NAME}'!N${rowIndex}`,
              values: [[fields.notes || ""]],
            },
          ],
        },
      });

      return NextResponse.json({ ok: true, message: "Lead updated." });
    }

    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
