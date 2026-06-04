WEEKLY REPORT SCRIPT
CogoChat CRM Automated Email Setup
====================================


WHAT THIS DOES

The script weekly-report.js reads your CogoChat CRM Google Sheet and sends
a summary email to hello@cogochat.com every Monday morning. It covers new
leads, lead status breakdown, deals won, and commission owed to Conner.


BEFORE YOU START

1. Make sure credentials.json is in the project root:
   C:\Users\grive\Downloads\cogochat\cogochat\credentials.json

2. Create a .env file in the project root if you do not have one already:
   C:\Users\grive\Downloads\cogochat\cogochat\.env

   Add this line to it:
   RESEND_API_KEY=your_resend_api_key_here

   To get a Resend API key:
   - Go to https://resend.com and create a free account
   - Go to API Keys and create a new key
   - Paste it in the .env file

3. Install the required packages. Open a terminal, go to the project folder,
   and run:
   npm install googleapis resend dotenv

4. Test the script runs correctly before scheduling it:
   node C:\Users\grive\Downloads\cogochat\cogochat\scripts\weekly-report.js

   You should see output ending in "Weekly report sent successfully."
   Check hello@cogochat.com for the email.


HOW TO SET UP THE WINDOWS SCHEDULED TASK (Task Scheduler)

This sets the script to run automatically every Monday at 8am.

Step 1: Open Task Scheduler
   Press the Windows key, search for Task Scheduler, and open it.

Step 2: Create a new task
   In the right panel click "Create Task" (not "Create Basic Task").

Step 3: General tab
   Name: CogoChat Weekly Report
   Tick "Run whether user is logged on or not"
   Tick "Run with highest privileges"

Step 4: Triggers tab
   Click New.
   Set Begin the task to: On a schedule
   Set Settings to: Weekly
   Set Start to: the coming Monday at 08:00:00
   Tick Monday only
   Click OK.

Step 5: Actions tab
   Click New.
   Action: Start a program
   Program/script: node
   Add arguments: C:\Users\grive\Downloads\cogochat\cogochat\scripts\weekly-report.js
   Start in: C:\Users\grive\Downloads\cogochat\cogochat
   Click OK.

Step 6: Conditions tab
   Untick "Start the task only if the computer is on AC power"
   so it runs even if the laptop is on battery.

Step 7: Click OK and enter your Windows password when prompted.

Step 8: Test it by right-clicking the task and selecting Run.
   Check hello@cogochat.com for the email.


FINDING YOUR NODE PATH

If Task Scheduler says it cannot find node, you need the full path.
Open a terminal and run:
   where node

It will return something like:
   C:\Program Files\nodejs\node.exe

Use that full path in the Program/script field in Step 5 instead of just "node".


TROUBLESHOOTING

Script runs but no email arrives:
   Check your RESEND_API_KEY in the .env file is correct.
   Make sure hello@cogochat.com is a verified sender in your Resend account.

Script fails with a Google auth error:
   Make sure credentials.json is in the right place.
   Make sure the service account email has Editor access to the Google Sheet.
   Service account email: cogochat-crm@mineral-liberty-498414-q0.iam.gserviceaccount.com

Script fails with "Cannot find module":
   Run npm install googleapis resend dotenv in the project folder.

Task Scheduler runs but nothing happens:
   Check the History tab on the task for error codes.
   Make sure the "Start in" path is set correctly (Step 5 above).
