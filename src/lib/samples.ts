import { SampleScenario } from './types';

export const SAMPLE_SCENARIOS: SampleScenario[] = [
  {
    id: 'sbi-kyc-scam',
    title: 'Fake SBI YONO KYC Suspension',
    category: 'Banking / KYC Fraud',
    risk_level: 'CRITICAL',
    type: 'message',
    language: 'Hinglish',
    description: 'Classic bank impersonation smishing coercing urgent KYC verification with a deceptive link.',
    content: 'Dear SBI User, Your YONO Account will be blocked today due to pending KYC update. Click link immediately to update your PAN and Aadhaar: http://sbi-kyc-verify.update-portal.xyz/login'
  },
  {
    id: 'upi-cashback-pin',
    title: 'Deceptive UPI Cashback Reward Trap',
    category: 'UPI / Payment Scam',
    risk_level: 'CRITICAL',
    type: 'message',
    language: 'Hinglish',
    description: 'Predatory cashback trick directing the victim to input their confidential UPI PIN to receive money.',
    content: 'Congratulations! You have received Rs 4,999 cashback from PhonePe Rewards. Click here to claim your reward in bank account: https://phonepe-rewards.claim-bonus.click/pay and Enter your UPI PIN to credit funds.'
  },
  {
    id: 'wfh-telegram-scam',
    title: 'Part-Time YouTube/Telegram Job Offer',
    category: 'Fake Job / Task Scam',
    risk_level: 'HIGH',
    type: 'message',
    language: 'English',
    description: 'Prepaid task scam luring jobseekers with promises of ₹3,000–₹5,000 daily for liking videos.',
    content: 'Greetings from Global HR Solutions! We have urgent Work-From-Home opening. Just like YouTube videos and write Google reviews to earn Rs 2,500 to Rs 6,000 daily. No investment needed. Contact HR Manager on Telegram: @GlobalTaskSupport_Official'
  },
  {
    id: 'kbc-lottery-scam',
    title: 'KBC 25 Lakh WhatsApp Lottery Jackpot',
    category: 'Lottery / Prize Scam',
    risk_level: 'CRITICAL',
    type: 'message',
    language: 'Hindi',
    description: 'WhatsApp lottery fraud leveraging Amitabh Bachchan / KBC brand with a fake manager contact.',
    content: 'Badhai Ho! Aapka SIM Card Kaun Banega Crorepati (KBC) Lucky Draw me 25 Lakh Rupaye jeet chuka hai. Lottery claim karne ke liye turant KBC Manager Rana Pratap Singh se WhatsApp par sampark karein: +91-9876543210. Lottery File No: KBC-7892.'
  },
  {
    id: 'india-post-courier',
    title: 'India Post Address Update Smishing',
    category: 'Courier / Delivery Fraud',
    risk_level: 'HIGH',
    type: 'message',
    language: 'English',
    description: 'Courier phishing targeting online shoppers claiming incomplete address to steal credit card details.',
    content: 'IndiaPost: Your parcel IN982736412 cannot be delivered due to incomplete street address. Please update your delivery address within 12 hours at http://192.168.10.45/indiapost/address-update to avoid parcel return.'
  },
  {
    id: 'pm-yojana-grant',
    title: 'Fake PM Yojana 3-Month Free Recharge',
    category: 'Fake Govt Scheme',
    risk_level: 'HIGH',
    type: 'message',
    language: 'Hinglish',
    description: 'Social engineering exploiting government subsidies with a viral forwarding link.',
    content: 'PM Narendra Modi Sarkar de rahi hai sabhi Indian users ko 3 Mahine ka Free 5G Recharge (Jio/Airtel/Vi) election special offer. Apna free recharge activate karne ke liye abhi link kholein aur 5 dosto ko forward karein: http://pm-free-recharge.gov-portal.buzz'
  },
  {
    id: 'legit-bank-otp',
    title: 'Legitimate HDFC Bank Transaction OTP',
    category: 'Legitimate Communication',
    risk_level: 'SAFE',
    type: 'message',
    language: 'English',
    description: 'Standard genuine bank transaction OTP following RBI safety disclaimers.',
    content: '729104 is the OTP for transaction of INR 1,450.00 at AMAZON INDIA on your HDFC Bank Card ending 4092. Valid for 10 mins. Never share OTP or password with anyone, including bank staff.'
  },
  {
    id: 'legit-courier-delivery',
    title: 'Legitimate Amazon Order Out for Delivery',
    category: 'Legitimate Communication',
    risk_level: 'SAFE',
    type: 'message',
    language: 'English',
    description: 'Legitimate e-commerce shipment notification with no credential requests or suspicious links.',
    content: 'Your Amazon package containing "Wireless Bluetooth Mouse" is out for delivery today with delivery associate Ramesh (Phone: 9812345678). Share delivery code 4821 with the associate at the time of delivery.'
  }
];
