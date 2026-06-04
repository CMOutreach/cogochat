// ============================================================
// HOW TO SET UP YOUR GOOGLE SERVICE ACCOUNT (credentials.json)
// ============================================================
//
// Step 1: Go to https://console.cloud.google.com
//         Sign in with a Google account.
//
// Step 2: Create a new project (or select an existing one).
//         Click the project dropdown at the top and hit "New Project".
//
// Step 3: Enable the Google Sheets API.
//         Go to "APIs & Services" > "Library".
//         Search for "Google Sheets API" and click Enable.
//
// Step 4: Create a service account.
//         Go to "APIs & Services" > "Credentials".
//         Click "Create Credentials" > "Service account".
//         Give it a name (e.g. cogochat-crm) and click Done.
//
// Step 5: Create a JSON key for the service account.
//         Click the service account you just created.
//         Go to the "Keys" tab.
//         Click "Add Key" > "Create new key" > choose JSON.
//         A file downloads automatically. Rename it credentials.json
//         and place it in the root of this project.
//
// Step 6: Share your Google Sheet with the service account.
//         Open your credentials.json file and find the value for
//         "client_email". It looks like:
//         cogochat-crm@your-project.iam.gserviceaccount.com
//         Open the Google Sheet, click Share, and paste that email.
//         Give it Editor access. Click Send.
//
// Step 7: Install dependencies.
//         Run: npm install googleapis
//
// Step 8: Run this script.
//         Run: node setup-crm.js
//
// The script is safe to run more than once. It will clear and
// rebuild the sheet each time.
// ============================================================

const { google } = require('googleapis');
const path = require('path');

const SPREADSHEET_ID = '1dM0JB6WBgQ4AQxhbmCAa6u4oPSkTHPB0MFk0_xGRk6Y';
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

const MAIN_SHEET_NAME = 'CogoChat CRM';
const SUMMARY_SHEET_NAME = 'Summary';

const DARK_GREEN = { red: 0.106, green: 0.369, blue: 0.2 };
const WHITE = { red: 1, green: 1, blue: 1 };
const LIGHT_GREEN = { red: 0.851, green: 0.918, blue: 0.867 };

async function getAuth() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return auth.getClient();
}

async function getOrCreateSheet(sheets, spreadsheetId, title) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const existing = meta.data.sheets.find(s => s.properties.title === title);
  if (existing) return existing.properties.sheetId;

  const res = await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [{ addSheet: { properties: { title } } }],
    },
  });
  return res.data.replies[0].addSheet.properties.sheetId;
}

async function clearSheet(sheets, spreadsheetId, sheetTitle) {
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: `'${sheetTitle}'`,
  });
}

async function buildMainSheet(sheets, spreadsheetId, sheetId) {
  const headers = [
    'Date Added',
    'Business Name',
    'Contact Name',
    'Phone',
    'Email',
    'Location',
    'Lead Source',
    'Status',
    'Service',
    'Deal Value (£)',
    'Monthly Value (£)',
    'One Off Commission (£)',
    'Monthly Commission (£)',
    'Notes',
    'Proposal Sent Date',
    'Close Date',
  ];

  // Write headers
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${MAIN_SHEET_NAME}'!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [headers] },
  });

  const requests = [];

  // Bold headers, dark green background, white text
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 16 },
      cell: {
        userEnteredFormat: {
          backgroundColor: DARK_GREEN,
          textFormat: { bold: true, foregroundColor: WHITE, fontSize: 10 },
          horizontalAlignment: 'CENTER',
          verticalAlignment: 'MIDDLE',
        },
      },
      fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)',
    },
  });

  // Freeze row 1
  requests.push({
    updateSheetProperties: {
      properties: { sheetId, gridProperties: { frozenRowCount: 1 } },
      fields: 'gridProperties.frozenRowCount',
    },
  });

  // Column widths (pixels)
  const colWidths = [
    110, // A Date Added
    180, // B Business Name
    150, // C Contact Name
    120, // D Phone
    200, // E Email
    130, // F Location
    130, // G Lead Source
    130, // H Status
    180, // I Service
    130, // J Deal Value
    130, // K Monthly Value
    160, // L One Off Commission
    160, // M Monthly Commission
    250, // N Notes
    150, // O Proposal Sent Date
    120, // P Close Date
  ];

  colWidths.forEach((width, i) => {
    requests.push({
      updateDimensionProperties: {
        range: { sheetId, dimension: 'COLUMNS', startIndex: i, endIndex: i + 1 },
        properties: { pixelSize: width },
        fields: 'pixelSize',
      },
    });
  });

  // Row height for header
  requests.push({
    updateDimensionProperties: {
      range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 },
      properties: { pixelSize: 36 },
      fields: 'pixelSize',
    },
  });

  // GBP currency format for columns J, K, L, M (indices 9, 10, 11, 12)
  [9, 10, 11, 12].forEach(colIndex => {
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: 1, endRowIndex: 1000, startColumnIndex: colIndex, endColumnIndex: colIndex + 1 },
        cell: {
          userEnteredFormat: {
            numberFormat: { type: 'CURRENCY', pattern: '£#,##0.00' },
          },
        },
        fields: 'userEnteredFormat.numberFormat',
      },
    });
  });

  // Alternating row colours for data rows
  requests.push({
    addBanding: {
      bandedRange: {
        bandedRangeId: sheetId + 100,
        range: { sheetId, startRowIndex: 1, endRowIndex: 1000, startColumnIndex: 0, endColumnIndex: 16 },
        rowProperties: {
          headerColor: DARK_GREEN,
          firstBandColor: WHITE,
          secondBandColor: LIGHT_GREEN,
        },
      },
    },
  });

  // Dropdown: Lead Source (col G = index 6)
  requests.push({
    setDataValidation: {
      range: { sheetId, startRowIndex: 1, endRowIndex: 1000, startColumnIndex: 6, endColumnIndex: 7 },
      rule: {
        condition: {
          type: 'ONE_OF_LIST',
          values: [
            { userEnteredValue: 'Owner Found' },
            { userEnteredValue: 'Conner Found' },
          ],
        },
        showCustomUi: true,
        strict: true,
      },
    },
  });

  // Dropdown: Status (col H = index 7)
  requests.push({
    setDataValidation: {
      range: { sheetId, startRowIndex: 1, endRowIndex: 1000, startColumnIndex: 7, endColumnIndex: 8 },
      rule: {
        condition: {
          type: 'ONE_OF_LIST',
          values: [
            { userEnteredValue: 'New' },
            { userEnteredValue: 'Contacted' },
            { userEnteredValue: 'Audit Done' },
            { userEnteredValue: 'Proposal Sent' },
            { userEnteredValue: 'Won' },
            { userEnteredValue: 'Lost' },
            { userEnteredValue: 'No Response' },
          ],
        },
        showCustomUi: true,
        strict: true,
      },
    },
  });

  // Dropdown: Service (col I = index 8)
  requests.push({
    setDataValidation: {
      range: { sheetId, startRowIndex: 1, endRowIndex: 1000, startColumnIndex: 8, endColumnIndex: 9 },
      rule: {
        condition: {
          type: 'ONE_OF_LIST',
          values: [
            { userEnteredValue: 'Starter Website' },
            { userEnteredValue: 'Growth Website' },
            { userEnteredValue: 'Landing Page' },
            { userEnteredValue: 'Lead Generation' },
            { userEnteredValue: 'Ads Management' },
            { userEnteredValue: 'Pro Full Service' },
          ],
        },
        showCustomUi: true,
        strict: true,
      },
    },
  });

  await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });

  // Write commission formulas for rows 2 to 1000
  // One Off Commission (col L): owner = 20%, conner <500 = 40%, conner >=500 = 30%
  // Monthly Commission (col M): owner = 20%, conner = tier lookup from Summary!B9
  const oneOffFormulas = [];
  const monthlyFormulas = [];

  for (let row = 2; row <= 1000; row++) {
    oneOffFormulas.push([
      `=IF(G${row}="","",IF(G${row}="Owner Found",J${row}*0.2,IF(J${row}<500,J${row}*0.4,J${row}*0.3)))`,
    ]);
    monthlyFormulas.push([
      `=IF(G${row}="","",IF(G${row}="Owner Found",K${row}*0.2,IF(Summary!$B$9<=5,K${row}*0.2,IF(Summary!$B$9<=10,K${row}*0.25,IF(Summary!$B$9<=20,K${row}*0.3,K${row}*0.4)))))`,
    ]);
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${MAIN_SHEET_NAME}'!L2:L1000`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: oneOffFormulas },
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${MAIN_SHEET_NAME}'!M2:M1000`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: monthlyFormulas },
  });

  console.log('Main sheet built.');
}

async function buildSummarySheet(sheets, spreadsheetId, sheetId) {
  const mainRef = `'${MAIN_SHEET_NAME}'`;

  const summaryData = [
    ['CogoChat CRM — Summary', ''],
    ['', ''],
    ['Metric', 'Value'],
    ['Total Leads', `=COUNTA(${mainRef}!B2:B1000)`],
    ['Leads Won', `=COUNTIF(${mainRef}!H2:H1000,"Won")`],
    ['Leads Lost', `=COUNTIF(${mainRef}!H2:H1000,"Lost")`],
    ['Total Pipeline Value (one off)', `=SUMIF(${mainRef}!H2:H1000,"<>Lost",${mainRef}!J2:J1000)`],
    ['Total Won Value (one off)', `=SUMIF(${mainRef}!H2:H1000,"Won",${mainRef}!J2:J1000)`],
    ['ConnerTier (monthly clients Conner has personally closed)', 0],
    ['', ''],
    ['Commission This Month', ''],
    ['One Off Commission Owed', `=SUMIF(${mainRef}!H2:H1000,"Won",${mainRef}!L2:L1000)`],
    ['Monthly Commission Owed', `=SUM(${mainRef}!M2:M1000)`],
    ['Total Commission Owed', `=B12+B13`],
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${SUMMARY_SHEET_NAME}'!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: summaryData },
  });

  const requests = [];

  // Title row formatting
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 2 },
      cell: {
        userEnteredFormat: {
          backgroundColor: DARK_GREEN,
          textFormat: { bold: true, foregroundColor: WHITE, fontSize: 13 },
        },
      },
      fields: 'userEnteredFormat(backgroundColor,textFormat)',
    },
  });

  // Header row for metrics table (row 3, index 2)
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 2, endRowIndex: 3, startColumnIndex: 0, endColumnIndex: 2 },
      cell: {
        userEnteredFormat: {
          backgroundColor: DARK_GREEN,
          textFormat: { bold: true, foregroundColor: WHITE },
        },
      },
      fields: 'userEnteredFormat(backgroundColor,textFormat)',
    },
  });

  // Highlight ConnerTier cell (row 9 = index 8, col B = index 1) in yellow so it stands out
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 8, endRowIndex: 9, startColumnIndex: 1, endColumnIndex: 2 },
      cell: {
        userEnteredFormat: {
          backgroundColor: { red: 1, green: 0.949, blue: 0.6 },
          textFormat: { bold: true, fontSize: 12 },
        },
      },
      fields: 'userEnteredFormat(backgroundColor,textFormat)',
    },
  });

  // Commission section header (row 11 = index 10)
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 10, endRowIndex: 11, startColumnIndex: 0, endColumnIndex: 2 },
      cell: {
        userEnteredFormat: {
          backgroundColor: DARK_GREEN,
          textFormat: { bold: true, foregroundColor: WHITE },
        },
      },
      fields: 'userEnteredFormat(backgroundColor,textFormat)',
    },
  });

  // GBP format for pipeline, won value, and commission cells (B7, B8, B12, B13, B14)
  [6, 7, 11, 12, 13].forEach(rowIndex => {
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: rowIndex, endRowIndex: rowIndex + 1, startColumnIndex: 1, endColumnIndex: 2 },
        cell: {
          userEnteredFormat: {
            numberFormat: { type: 'CURRENCY', pattern: '£#,##0.00' },
          },
        },
        fields: 'userEnteredFormat.numberFormat',
      },
    });
  });

  // Column widths
  requests.push({
    updateDimensionProperties: {
      range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 },
      properties: { pixelSize: 380 },
      fields: 'pixelSize',
    },
  });
  requests.push({
    updateDimensionProperties: {
      range: { sheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 2 },
      properties: { pixelSize: 180 },
      fields: 'pixelSize',
    },
  });

  await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });

  console.log('Summary sheet built.');
}

async function main() {
  console.log('Connecting to Google Sheets...');
  const auth = await getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  console.log('Setting up sheets...');
  const mainSheetId = await getOrCreateSheet(sheets, SPREADSHEET_ID, MAIN_SHEET_NAME);
  const summarySheetId = await getOrCreateSheet(sheets, SPREADSHEET_ID, SUMMARY_SHEET_NAME);

  console.log('Clearing existing content...');
  await clearSheet(sheets, SPREADSHEET_ID, MAIN_SHEET_NAME);
  await clearSheet(sheets, SPREADSHEET_ID, SUMMARY_SHEET_NAME);

  console.log('Building main CRM sheet...');
  await buildMainSheet(sheets, SPREADSHEET_ID, mainSheetId);

  console.log('Building summary sheet...');
  await buildSummarySheet(sheets, SPREADSHEET_ID, summarySheetId);

  console.log('\nDone. Your CRM is ready at:');
  console.log(`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`);
  console.log('\nRemember to update ConnerTier in the Summary sheet (cell B9)');
  console.log('whenever Conner closes a new monthly retainer client.');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
