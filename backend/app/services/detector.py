import re


def detect_scam(message: str):

    text = message.lower().strip()

    risk_score = 0
    red_flags = []

    # Suspicious URL detection
    url_pattern = r"https?://\S+|www\.\S+"

    if re.search(url_pattern, text):
        risk_score += 25
        red_flags.append("Suspicious link")

    # Urgency detection
    urgency_keywords = [
        "urgent",
        "immediately",
        "act now",
        "expires today",
        "within 24 hours",
        "last warning",
        "as soon as possible"
    ]

    if any(keyword in text for keyword in urgency_keywords):
        risk_score += 15
        red_flags.append("Urgency")

    # Threat detection
    threat_keywords = [
        "account will be blocked",
        "account will be suspended",
        "account will be closed",
        "account will be deactivated",
        "legal action",
        "police complaint",
        "penalty",
        "fine",
        "account blocked",
        "account suspended",
        "account closed",
        "account deactivated"
    ]

    if any(keyword in text for keyword in threat_keywords):
        risk_score += 20
        red_flags.append("Threat or consequence")

    # OTP / PIN detection
    otp_keywords = [
        "otp",
        "one time password",
        "pin",
        "upi pin",
        "atm pin",
        "cvv",
        "password"
    ]

    if any(keyword in text for keyword in otp_keywords):
        risk_score += 30
        red_flags.append("Requests sensitive credentials")

    # Payment / UPI detection
    payment_keywords = [
        "send money",
        "transfer money",
        "make payment",
        "pay now",
        "upi payment",
        "upi request",
        "collect request",
        "approve payment",
        "payment request",
        "send ₹",
        "send rs",
        "send inr"
    ]

    if any(keyword in text for keyword in payment_keywords):
        risk_score += 30
        red_flags.append("Payment or UPI request")

    # Bank impersonation detection
    bank_keywords = [
        "bank",
        "sbi",
        "hdfc",
        "icici",
        "axis bank",
        "kotak",
        "customer care",
        "bank official",
        "bank officer",
        "bank representative"
    ]

    if any(keyword in text for keyword in bank_keywords):
        risk_score += 20
        red_flags.append("Possible bank impersonation")

    # Lottery / reward detection
    reward_keywords = [
        "lottery",
        "you won",
        "winner",
        "congratulations",
        "cash prize",
        "prize money",
        "reward",
        "free gift",
        "lucky draw",
        "claim your prize",
        "claim reward"
    ]

    if any(keyword in text for keyword in reward_keywords):
        risk_score += 25
        red_flags.append("Lottery or reward scam")

        # Verdict determination
    if risk_score <= 30:
        verdict = "SAFE"
    elif risk_score <= 65:
        verdict = "SUSPICIOUS"
    else:
        verdict = "SCAM"

        # Scam category
    if any(keyword in text for keyword in ["otp", "one time password", "upi pin", "cvv"]):
        category = "OTP_PHISHING"

    elif any(keyword in text for keyword in [
        "upi request",
        "collect request",
        "approve payment",
        "payment request",
        "send money",
        "transfer money"
    ]):
        category = "UPI_PAYMENT_SCAM"

    elif any(keyword in text for keyword in [
        "lottery",
        "you won",
        "winner",
        "cash prize",
        "prize money",
        "reward",
        "lucky draw"
    ]):
        category = "LOTTERY_SCAM"

    elif any(keyword in text for keyword in [
        "kyc",
        "know your customer",
        "kyc expired",
        "update kyc"
    ]):
        category = "KYC_PHISHING"

    elif any(keyword in text for keyword in [
        "sbi",
        "hdfc",
        "icici",
        "axis bank",
        "kotak",
        "customer care",
        "bank official",
        "bank officer"
    ]):
        category = "BANK_IMPERSONATION"

    else:
        category = "GENERAL_SCAM"

        # Recommended action
    if category == "OTP_PHISHING":
        recommended_action = "Do not share your OTP, PIN, CVV, or password."

    elif category == "UPI_PAYMENT_SCAM":
        recommended_action = "Do not approve the UPI request or send money."

    elif category == "LOTTERY_SCAM":
        recommended_action = "Do not pay any fee or share your bank details to claim the prize."

    elif category == "KYC_PHISHING":
        recommended_action = "Do not click the link. Check your KYC status through your bank's official app."

    elif category == "BANK_IMPERSONATION":
        recommended_action = "Do not share personal or banking information. Contact your bank using its official number."

    elif verdict == "SAFE":
        recommended_action = "No immediate action required."

    else:
        recommended_action = "Do not click suspicious links or share personal or banking information."

    return {
        "message": text,
        "risk_score": risk_score,
        "verdict": verdict,
        "category": category,
        "red_flags": red_flags,
        "recommended_action": recommended_action
    }
