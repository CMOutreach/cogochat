// ============================================================
// CogoChat Weekly Report
// Reads the CRM Google Sheet and emails a summary via Resend.
//
// Requirements:
//   npm install googleapis resend dotenv
//
// Setup:
//   1. Make sure credentials.json is in the project root.
//   2. Create a .env file in the project root with:
//      RESEND_API_KEY=your_resend_api_key_here
//   3. Run manually to test:
//      node C:\Users\grive\Downloads\cogochat\cogochat\scripts\weekly-report.js
//   4. See scripts/README.txt to set up the weekly scheduled task.
// ============================================================

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const { google } = require('googleapis');
const { Resend } = require('resend');
const path = require('path');

const SPREADSHEET_ID = '1dM0JB6WBgQ4AQxhbmCAa6u4oPSkTHPB0MFk0_xGRk6Y';
const SHEET_NAME = 'CogoChat CRM';
const CREDENTIALS_PATH = path.join(__dirname, '..', 'credentials.json');
const REPORT_EMAIL = 'hello@cogochat.com';

// Column indices (0-based) matching setup-crm.js
const COL = {
  DATE_ADDED:        0,  // A
  BUSINESS_NAME:     1,  // B
  STATUS:            7,  // H
  DEAL_VALUE:        9,  // J
  MONTHLY_VALUE:     10, // K
  ONE_OFF_COMMISSION: 11, // L
  MONTHLY_COMMISSION: 12, // M
};

function parseGBP(value) {
  if (!value || value === '') return 0;
  const cleaned = String(value).replace(/[£,\s]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function formatGBP(amount) {
  return '£' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function isThisWeek(dateStr) {
  if (!dateStr) return false;
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  // Handle DD/MM/YYYY and MM/DD/YYYY and YYYY-MM-DD
  let date;
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      // Try DD/MM/YYYY first (UK format)
      date = new Date(`${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`);
      if (isNaN(date.getTime())) {
        // Fall back to MM/DD/YYYY
        date = new Date(dateStr);
      }
    }
  } else {
    date = new Date(dateStr);
  }

  if (isNaN(date.getTime())) return false;
  return date >= sevenDaysAgo && date <= now;
}

function isThisMonth(dateStr) {
  if (!dateStr) return false;
  const now = new Date();
  let date;
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      date = new Date(`${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`);
      if (isNaN(date.getTime())) date = new Date(dateStr);
    }
  } else {
    date = new Date(dateStr);
  }
  if (isNaN(date.getTime())) return false;
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

async function fetchSheetData() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `'${SHEET_NAME}'!A2:P1000`,
  });

  return res.data.values || [];
}

function buildReport(rows) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const statusCounts = {
    New: 0,
    Contacted: 0,
    'Audit Done': 0,
    'Proposal Sent': 0,
    Won: 0,
    Lost: 0,
    'No Response': 0,
  };

  let newLeadsThisWeek = 0;
  let pipelineValueThisWeek = 0;
  const wonsThisWeek = [];
  let totalCommissionThisMonth = 0;

  for (const row of rows) {
    if (!row || row.length === 0) continue;

    const businessName  = row[COL.BUSINESS_NAME] || '';
    const dateAdded     = row[COL.DATE_ADDED] || '';
    const status        = row[COL.STATUS] || '';
    const dealValue     = parseGBP(row[COL.DEAL_VALUE]);
    const closeDate     = row[15] || ''; // P: Close Date
    const oneOffComm    = parseGBP(row[COL.ONE_OFF_COMMISSION]);
    const monthlyComm   = parseGBP(row[COL.MONTHLY_COMMISSION]);

    // Status counts (all time)
    if (status && statusCounts.hasOwnProperty(status)) {
      statusCounts[status]++;
    }

    // This week: new leads
    if (isThisWeek(dateAdded) && businessName !== '') {
      newLeadsThisWeek++;
      pipelineValueThisWeek += dealValue;
    }

    // This week: won deals (by close date if available, else date added)
    const wonDate = closeDate || dateAdded;
    if (status === 'Won' && isThisWeek(wonDate) && businessName !== '') {
      wonsThisWeek.push({ name: businessName, value: dealValue });
    }

    // This month: commission
    const commDate = closeDate || dateAdded;
    if (isThisMonth(commDate) && businessName !== '') {
      totalCommissionThisMonth += oneOffComm + monthlyComm;
    }
  }

  return {
    dateStr,
    newLeadsThisWeek,
    statusCounts,
    pipelineValueThisWeek,
    wonsThisWeek,
    totalCommissionThisMonth,
  };
}

function buildEmailHtml(report) {
  const {
    dateStr,
    newLeadsThisWeek,
    statusCounts,
    pipelineValueThisWeek,
    wonsThisWeek,
    totalCommissionThisMonth,
  } = report;

  const statusRows = Object.entries(statusCounts)
    .map(([status, count]) => `
      <tr>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;">${status}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:center;font-weight:bold;">${count}</td>
      </tr>`)
    .join('');

  const wonRows = wonsThisWeek.length > 0
    ? wonsThisWeek.map(w => `
      <tr>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;">${w.name}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;color:#1a5c33;font-weight:bold;">${formatGBP(w.value)}</td>
      </tr>`).join('')
    : `<tr><td colspan="2" style="padding:6px 12px;color:#999;">No deals closed this week.</td></tr>`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;color:#222;max-width:600px;margin:0 auto;padding:20px;">

  <div style="background:#1b5e32;padding:24px 28px;border-radius:8px 8px 0 0;">
    <h1 style="color:#fff;margin:0;font-size:22px;">CogoChat Weekly Report</h1>
    <p style="color:#a5d6a7;margin:6px 0 0;">${dateStr}</p>
  </div>

  <div style="background:#f9f9f9;padding:20px 28px;border:1px solid #e0e0e0;border-top:none;">

    <h2 style="color:#1b5e32;font-size:16px;margin-top:0;">New Leads This Week</h2>
    <p style="font-size:32px;font-weight:bold;margin:0 0 4px;">${newLeadsThisWeek}</p>
    <p style="color:#666;margin:0 0 24px;">Pipeline value from new leads: <strong>${formatGBP(pipelineValueThisWeek)}</strong></p>

    <h2 style="color:#1b5e32;font-size:16px;">All Leads by Status</h2>
    <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;margin-bottom:24px;">
      <thead>
        <tr style="background:#1b5e32;color:#fff;">
          <th style="padding:8px 12px;text-align:left;">Status</th>
          <th style="padding:8px 12px;text-align:center;">Count</th>
        </tr>
      </thead>
      <tbody>${statusRows}</tbody>
    </table>

    <h2 style="color:#1b5e32;font-size:16px;">Deals Won This Week</h2>
    <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;margin-bottom:24px;">
      <thead>
        <tr style="background:#1b5e32;color:#fff;">
          <th style="padding:8px 12px;text-align:left;">Business</th>
          <th style="padding:8px 12px;text-align:right;">Deal Value</th>
        </tr>
      </thead>
      <tbody>${wonRows}</tbody>
    </table>

    <h2 style="color:#1b5e32;font-size:16px;">Commission Owed to Conner This Month</h2>
    <p style="font-size:28px;font-weight:bold;color:#1b5e32;margin:0 0 24px;">${formatGBP(totalCommissionThisMonth)}</p>

    <p style="color:#aaa;font-size:12px;border-top:1px solid #e0e0e0;padding-top:16px;margin:0;">
      This report was generated automatically by CogoChat CRM.<br>
      To view the full sheet: <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}" style="color:#1b5e32;">Open CRM</a>
    </p>

  </div>

</body>
</html>`;
}

async function sendEmail(subject, html) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const res = await resend.emails.send({
    from: 'CogoChat Reports <hello@cogochat.com>',
    to: REPORT_EMAIL,
    subject,
    html,
  });
  return res;
}

async function main() {
  if (!process.env.RESEND_API_KEY) {
    console.error('Error: RESEND_API_KEY is not set in your .env file.');
    process.exit(1);
  }

  console.log('Fetching CRM data...');
  const rows = await fetchSheetData();
  console.log(`Read ${rows.length} rows from the sheet.`);

  const report = buildReport(rows);

  const now = new Date();
  const dateLabel = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const subject = `CogoChat Weekly Report - ${dateLabel}`;

  const html = buildEmailHtml(report);

  console.log('Sending email...');
  const result = await sendEmail(subject, html);

  if (result.error) {
    console.error('Failed to send email:', result.error);
    process.exit(1);
  }

  console.log('Weekly report sent successfully.');
  console.log('Email ID:', result.data?.id);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
