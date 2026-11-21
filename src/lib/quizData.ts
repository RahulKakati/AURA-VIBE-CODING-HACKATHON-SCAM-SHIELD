import { QuizQuestion } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: 'The UPI "Money Received" Mystery',
    scenario: 'A buyer on OLX contacts you to buy your old sofa. They claim to have sent ₹5,000 via Google Pay, but you receive a notification asking you to "Enter your UPI PIN to claim the ₹5,000 credit". What is actually happening?',
    source: 'OLX / UPI Marketplace',
    options: [
      'Entering your UPI PIN verifies your bank account so money can be credited.',
      'This is a scam. Entering your UPI PIN will DEBIT (deduct) ₹5,000 from your account.',
      'You should enter your UPI PIN quickly before the payment window expires.',
      'It is safe as long as you use Google Pay rather than PhonePe.'
    ],
    correctIndex: 1,
    explanation: 'GOLDEN RULE OF UPI: You NEVER need to enter your UPI PIN to RECEIVE or ACCEPT money. A UPI PIN is ONLY entered when authorized money is leaving your account.',
    redFlags: [
      'Requiring a UPI PIN to receive money',
      'Buyer rushing you to complete the step',
      'Fake screenshot of a "pending payment request"'
    ],
    category: 'UPI / Payment Scam'
  },
  {
    id: 2,
    title: 'The Urgent 2-Hour Bank Account Freeze',
    scenario: 'You receive an SMS: "Dear Customer, Your SBI account #4902 will be blocked today within 2 hours. Click http://sbi-kyc-update.top to update your PAN and avoid suspension." What should your immediate response be?',
    source: 'SMS from unknown sender',
    options: [
      'Click the link and fill out only your PAN card number.',
      'Call the mobile number from which the SMS was received to confirm.',
      'Delete and report the SMS. Legitimate banks never send account blocking links via short SMS or from 10-digit mobile numbers.',
      'Forward the message to your family members so they are also warned.'
    ],
    correctIndex: 2,
    explanation: 'Banks in India (mandated by RBI) never ask customers to update KYC details through third-party links or unverified TLDs (.top, .xyz). Any account communication is sent via official registered sender headers (e.g. VK-SBIIN, CP-HDFCBK).',
    redFlags: [
      'Urgency tactic ("within 2 hours")',
      'Non-official URL (.top domain)',
      'Threat of account suspension'
    ],
    category: 'Banking / KYC Fraud'
  },
  {
    id: 3,
    title: 'The Part-Time Telegram Task Trap',
    scenario: 'You are invited to a Telegram group. You are given ₹150 for liking 3 YouTube videos. Then the admin offers you "VIP investment tasks" where depositing ₹3,000 returns ₹4,500 within 20 minutes. What scam is this?',
    source: 'Telegram / WhatsApp Job Invitation',
    options: [
      'A legitimate digital marketing agency sharing advertising revenue.',
      'A classic "Task-Based Ponzi Scam". The initial ₹150 is psychological bait to steal your larger deposits.',
      'A government-approved startup initiative.',
      'A safe crypto mining affiliate opportunity.'
    ],
    correctIndex: 1,
    explanation: 'The small upfront payment (₹100–₹500) is known as "sweetener bait" used by organized cyber syndicates. Once victims deposit larger sums (₹10,000–₹5,00,000), their accounts are frozen under the pretext of "tax errors" or "wrong click penalties".',
    redFlags: [
      'Earning money for simply liking videos',
      'Transitioning from free tasks to demanding money deposits',
      'Recruitment conducted exclusively through Telegram'
    ],
    category: 'Fake Job / Task Scam'
  },
  {
    id: 4,
    title: 'The 9:30 PM Electricity Power Cut Alert',
    scenario: 'You receive a text: "Dear Consumer, your electricity power will be disconnected at 9:30 PM tonight from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer Mr. Sharma at 9876543210."',
    source: 'SMS from personal mobile number',
    options: [
      'Call Mr. Sharma immediately and pay the bill over the phone.',
      'Download the support app recommended by the caller.',
      'Ignore the SMS and verify your bill status independently on your official State DISCOM web portal or electricity app.',
      'Reply to the SMS with your electricity meter account number.'
    ],
    correctIndex: 2,
    explanation: 'State power distribution companies (DISCOMs) never send disconnection threats giving a personal mobile phone number for "settlement". Scammers use this panic to force victims into installing screen-sharing apps like AnyDesk.',
    redFlags: [
      'Night-time panic deadline (9:30 PM)',
      'Personal 10-digit mobile number given as "Officer contact"',
      'No mention of your actual consumer account ID'
    ],
    category: 'Electricity / Utility Disconnection'
  },
  {
    id: 5,
    title: 'The Nominal ₹5 India Post Delivery Fee',
    scenario: 'You get an SMS: "IndiaPost: Your package could not be delivered due to an incorrect PIN code. Visit http://indiapost-parcel.click to pay ₹5.00 re-delivery fee and correct your address." What will happen if you enter your card details?',
    source: 'Smishing SMS',
    options: [
      'Only ₹5 will be debited and your parcel will arrive tomorrow.',
      'The payment gateway is fake; scammers will capture your full card number, expiry, CVV and drain your account via OTP phishing.',
      'India Post charges ₹5 for re-routing parcels.',
      'It is safe because the amount is less than ₹10.'
    ],
    correctIndex: 1,
    explanation: 'The tiny ₹5 fee is a psychological trick to lower your suspicion. The phishing page records your card credentials and immediately triggers a massive unauthorized transaction while prompting you for the OTP.',
    redFlags: [
      'Extremely low token amount (₹5) to bypass skepticism',
      'Unofficial domain name (.click)',
      'Unsolicited parcel delivery update when you did not order via India Post'
    ],
    category: 'Courier / Delivery Fraud'
  },
  {
    id: 6,
    title: 'The Remote Screen Sharing "Support" Trap',
    scenario: 'You call what you believe is bank customer support found on Google. The representative asks you to install "AnyDesk" or "TeamViewer QuickSupport" on your mobile phone to assist with reversing a failed transaction. Should you install it?',
    source: 'Phone call with "bank support"',
    options: [
      'Yes, remote access allows the technician to diagnose banking network errors.',
      'ABSOLUTELY NOT. Remote access tools grant the scammer full real-time visibility of your screen, allowing them to read incoming OTPs and control your bank app.',
      'Yes, but uninstall it immediately after 5 minutes.',
      'Only install it if they give you their official employee ID number.'
    ],
    correctIndex: 1,
    explanation: 'Legitimate banks and payment apps NEVER require customers to install screen-sharing software (AnyDesk, RustDesk, TeamViewer). Once installed, the attacker views your screen, captures your MPIN and intercepts OTPs in real-time.',
    redFlags: [
      'Request to install AnyDesk, TeamViewer or QuickSupport',
      'Representative calling you back from an unverified mobile number',
      'Asking you to open your mobile banking app while screen-sharing'
    ],
    category: 'Social Engineering'
  },
  {
    id: 7,
    title: 'The ₹25 Lakh KBC WhatsApp Jackpot',
    scenario: 'You receive a WhatsApp message featuring photos of Amitabh Bachchan, the KBC logo, and an audio file congratulating you for winning a ₹25,00,000 lucky draw. You are told you only need to pay 1% (₹25,000) as government GST tax to receive the cheque. What is the truth?',
    source: 'WhatsApp from Pakistani or international number (+92 / +1)',
    options: [
      'You actually won because the certificate shows official government stamps.',
      'It is a 100% fraudulent advance-fee scam. No legitimate lottery requires winners to transfer cash before receiving prize money.',
      'Pay the ₹25,000 tax since ₹25 Lakh is a huge profit.',
      'Visit the KBC studio in Mumbai to collect the cheque.'
    ],
    correctIndex: 1,
    explanation: 'Legitimate lotteries and game shows (like KBC) do not draw random SIM card numbers, and prize taxes (TDS under Section 194B) are deducted by the organizer before disbursing the net winnings, never requested as an upfront cash deposit.',
    redFlags: [
      'Requiring advance payment to release prize money',
      'Foreign country code sender on WhatsApp (+92, +44, +1)',
      'You never bought a ticket or participated in a contest'
    ],
    category: 'Lottery / Prize Scam'
  },
  {
    id: 8,
    title: 'Recognizing Legitimate Bank Communications',
    scenario: 'You complete an online purchase on Flipkart. You immediately receive an SMS: "OTP for transaction of INR 3,299 at FLIPKART is 829104. Valid for 10 mins. Do not share OTP with anyone, including bank employees." How do you evaluate this?',
    source: 'Registered Bank SMS header (e.g. AX-AXISBK)',
    options: [
      'This is a phishing scam attempting to steal your money.',
      'This is a legitimate OTP notification for a transaction YOU initiated. It includes clear security warnings and contains no external URL links.',
      'You should forward this OTP to the Flipkart support team.',
      'This is an illegal transaction and you should block your card.'
    ],
    correctIndex: 1,
    explanation: 'Genuine transactional OTPs triggered by your own purchases clearly specify the exact merchant name, transaction amount, validity duration, and prominently warn NEVER to share the OTP with anyone. They do NOT contain shortened links or demand urgent replies.',
    redFlags: [],
    category: 'Legitimate Communication'
  }
];
