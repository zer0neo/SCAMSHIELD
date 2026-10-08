import re
from typing import Dict, List, Tuple


# ============================================================
# TEXT NORMALIZATION
# ============================================================

def normalize_text(text: str) -> str:
    """
    Normalize text without destroying multilingual characters.
    """

    if not isinstance(text, str):
        text = str(text)

    text = text.replace("\u200b", " ")
    text = text.replace("\u200c", " ")
    text = text.replace("\u200d", " ")
    text = text.replace("\ufeff", " ")

    text = text.replace("’", "'")
    text = text.replace("‘", "'")
    text = text.replace("“", '"')
    text = text.replace("”", '"')

    text = text.replace("–", "-")
    text = text.replace("—", "-")

    text = re.sub(r"\s+", " ", text)

    return text.lower().strip()


# ============================================================
# LANGUAGE DETECTION
# ============================================================

def detect_language(text: str) -> str:
    """
    Detect basic supported language categories.

    Supported:
    - English
    - Hindi
    - Kannada
    - Hindi-English
    - Kannada-English
    """

    has_devanagari = bool(re.search(r"[\u0900-\u097F]", text))
    has_kannada = bool(re.search(r"[\u0C80-\u0CFF]", text))
    has_latin = bool(re.search(r"[a-zA-Z]", text))

    if has_devanagari and has_latin:
        return "Hindi-English"

    if has_kannada and has_latin:
        return "Kannada-English"

    if has_devanagari:
        return "Hindi"

    if has_kannada:
        return "Kannada"

    return "English"


# ============================================================
# KEYWORD / PATTERN HELPERS
# ============================================================

def contains_any(text: str, patterns: List[str]) -> bool:
    """
    Returns True if any pattern exists in the text.
    """

    return any(re.search(pattern, text, re.IGNORECASE) for pattern in patterns)


def find_matches(text: str, patterns: List[str]) -> List[str]:
    """
    Return matching patterns.
    """

    matches = []

    for pattern in patterns:
        if re.search(pattern, text, re.IGNORECASE):
            matches.append(pattern)

    return matches


# ============================================================
# URL DETECTION
# ============================================================

URL_PATTERN = re.compile(
    r"https?://[^\s]+|www\.[^\s]+",
    re.IGNORECASE
)

IP_URL_PATTERN = re.compile(
    r"https?://(?:\d{1,3}\.){3}\d{1,3}",
    re.IGNORECASE
)


URL_SHORTENERS = [
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "goo.gl",
    "ow.ly",
    "is.gd",
    "buff.ly",
    "cutt.ly",
    "shorturl.at",
    "rb.gy",
]


def extract_urls(text: str) -> List[str]:
    return URL_PATTERN.findall(text)


def has_url(text: str) -> bool:
    return bool(URL_PATTERN.search(text))


def has_suspicious_url(text: str) -> bool:
    """
    Detect obvious suspicious URL characteristics.

    This does NOT automatically classify every URL as malicious.
    """

    urls = extract_urls(text)

    for url in urls:
        lower_url = url.lower()

        if IP_URL_PATTERN.search(lower_url):
            return True

        if any(shortener in lower_url for shortener in URL_SHORTENERS):
            return True

        if "@" in lower_url:
            return True

        if lower_url.count("-") >= 4:
            return True

    return False


# ============================================================
# URGENCY / DEADLINE
# ============================================================

URGENCY_PATTERNS = [
    r"\burgent\b",
    r"\bimmediately\b",
    r"\bimmediate\b",
    r"\bact now\b",
    r"\baction required\b",
    r"\blast chance\b",
    r"\bfinal notice\b",
    r"\bexpires?\b",
    r"\bwithin\s+\d+\s*(?:minutes?|hours?|days?)\b",
    r"\b\d+\s*(?:minutes?|hours?|days?)\s+(?:left|remaining)\b",

    # Hindi
    r"तुरंत",
    r"अभी",
    r"जल्दी",
    r"अंतिम",
    r"अंतिम तिथि",
    r"समय सीमा",
    r"आज",
    r"कल तक",
    r"तुरंत कार्रवाई",

    # Kannada
    r"ತಕ್ಷಣ",
    r"ತುರ್ತು",
    r"ಕೊನೆಯ ದಿನ",
    r"ಅಂತಿಮ ದಿನಾಂಕ",
    r"ಇಂದು",
]


DEADLINE_PATTERNS = [
    r"\b(?:jan|january|feb|february|mar|march|apr|april|may|"
    r"jun|june|jul|july|aug|august|sep|sept|september|"
    r"oct|october|nov|november|dec|december)\s+\d{1,2}\b",

    r"\b\d{1,2}\s+(?:jan|january|feb|february|mar|march|apr|april|may|"
    r"jun|june|jul|july|aug|august|sep|sept|september|"
    r"oct|october|nov|november|dec|december)\b",

    r"\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b",

    r"\b(?:today|tomorrow|tonight|by\s+today|by\s+tomorrow)\b",

    # Hindi
    r"आज\s*(?:तक|से पहले)?",
    r"कल\s*तक",
    r"अंतिम\s*तिथि",
    r"अंतिम\s*दिन",
    r"समय\s*सीमा",

    # Kannada
    r"ಇಂದು\s*(?:ಒಳಗೆ|ವರೆಗೆ)?",
    r"ನಾಳೆ\s*ವರೆಗೆ",
    r"ಕೊನೆಯ\s*ದಿನ",
    r"ಅಂತಿಮ\s*ದಿನಾಂಕ",
]


def has_urgency(text: str) -> bool:
    return contains_any(text, URGENCY_PATTERNS)


def has_deadline(text: str) -> bool:
    return contains_any(text, DEADLINE_PATTERNS)


# ============================================================
# THREAT / CONSEQUENCE
# ============================================================

THREAT_PATTERNS = [
    r"\bsuspend(?:ed)?\b",
    r"\bblocked\b",
    r"\bblock(?:ed)?\b",
    r"\bdeactivat(?:e|ed|ion)\b",
    r"\bterminat(?:e|ed|ion)\b",
    r"\blegal action\b",
    r"\barrest\b",
    r"\bpenalty\b",
    r"\bfine\b",
    r"\baccount will be closed\b",
    r"\baccount closure\b",
    r"\bpolice\b",
    r"\bcourt\b",

    # Hindi
    r"बंद",
    r"निलंबित",
    r"खाता बंद",
    r"कानूनी कार्रवाई",
    r"गिरफ्तार",
    r"जुर्माना",
    r"दंड",
    r"पुलिस",

    # Kannada
    r"ಮುಚ್ಚಲಾಗುವುದು",
    r"ನಿರ್ಬಂಧ",
    r"ಕಾನೂನು ಕ್ರಮ",
    r"ಬಂಧನ",
    r"ದಂಡ",
    r"ಪೊಲೀಸ್",
]


def has_threat(text: str) -> bool:
    return contains_any(text, THREAT_PATTERNS)


# ============================================================
# CREDENTIAL / OTP
# ============================================================

CREDENTIAL_PATTERNS = [
    r"\botp\b",
    r"\bpin\b",
    r"\bmpin\b",
    r"\bpassword\b",
    r"\bpasscode\b",
    r"\bverification code\b",
    r"\bsecurity code\b",
    r"\bcard number\b",
    r"\bcvv\b",
    r"\bexpiry\b",
    r"\bexpir(?:y|es|ed)\b",
    r"\blogin details?\b",
    r"\busername\b",

    # Hindi
    r"ओटीपी",
    r"पासवर्ड",
    r"पिन",
    r"सत्यापन कोड",
    r"कार्ड नंबर",

    # Kannada
    r"ಒಟಿಪಿ",
    r"ಪಾಸ್‌ವರ್ಡ್",
    r"ಪಿನ್",
    r"ಪರಿಶೀಲನಾ ಕೋಡ್",
]


def has_credentials(text: str) -> bool:
    return contains_any(text, CREDENTIAL_PATTERNS)


# ============================================================
# PAYMENT / UPI
# ============================================================

PAYMENT_PATTERNS = [
    r"\bupi\b",
    r"\bpay\b",
    r"\bpayment\b",
    r"\btransfer\b",
    r"\bsend money\b",
    r"\bpay now\b",
    r"\bdeposit\b",
    r"\brefund fee\b",
    r"\bprocessing fee\b",
    r"\bregistration fee\b",
    r"\baccount number\b",
    r"\bifsc\b",
    r"\bwallet\b",
    r"\bcrypto\b",
    r"\bbitcoin\b",
    r"\busdt\b",

    # Hindi
    r"भुगतान",
    r"पैसे भेजें",
    r"राशि जमा",
    r"शुल्क",
    r"फीस",
    r"यूपीआई",

    # Kannada
    r"ಪಾವತಿ",
    r"ಹಣ ಕಳುಹಿಸಿ",
    r"ಶುಲ್ಕ",
    r"ಯುಪಿಐ",
]


def has_payment(text: str) -> bool:
    return contains_any(text, PAYMENT_PATTERNS)


# ============================================================
# BANK IMPERSONATION
# ============================================================

BANK_PATTERNS = [
    r"\bbank\b",
    r"\bhdfc\b",
    r"\bicici\b",
    r"\bsbi\b",
    r"\baxis\b",
    r"\bkotak\b",
    r"\byes bank\b",
    r"\bindusind\b",
    r"\bcanara\b",
    r"\bunion bank\b",
    r"\bfederal bank\b",
    r"\bcredit card\b",
    r"\bdebit card\b",

    # Hindi
    r"बैंक",
    r"क्रेडिट कार्ड",
    r"डेबिट कार्ड",

    # Kannada
    r"ಬ್ಯಾಂಕ್",
    r"ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್",
    r"ಡೆಬಿಟ್ ಕಾರ್ಡ್",
]


def has_bank_impersonation(text: str) -> bool:
    return contains_any(text, BANK_PATTERNS)


# ============================================================
# REWARD / LOTTERY
# ============================================================

REWARD_PATTERNS = [
    r"\bwon\b",
    r"\bwinner\b",
    r"\bprize\b",
    r"\breward\b",
    r"\blottery\b",
    r"\bjackpot\b",
    r"\bcash prize\b",
    r"\bclaim your prize\b",
    r"\bbonus\b",
    r"\bgift\b",
    r"\bfree gift\b",

    # Hindi
    r"इनाम",
    r"लॉटरी",
    r"पुरस्कार",
    r"जीते",
    r"विजेता",
    r"बोनस",
    r"उपहार",

    # Kannada
    r"ಬಹುಮಾನ",
    r"ಲಾಟರಿ",
    r"ಜಾಕ್‌ಪಾಟ್",
    r"ಗೆದ್ದಿದ್ದೀರಿ",
    r"ಉಡುಗೊರೆ",
]


def has_reward(text: str) -> bool:
    return contains_any(text, REWARD_PATTERNS)


# ============================================================
# KYC
# ============================================================

KYC_PATTERNS = [
    r"\bkyc\b",
    r"\bverify your identity\b",
    r"\bidentity verification\b",
    r"\bverification required\b",
    r"\bupdate kyc\b",
    r"\bkyc update\b",

    # Hindi
    r"केवाईसी",
    r"पहचान सत्यापन",
    r"पहचान सत्यापित",

    # Kannada
    r"ಕೆವೈಸಿ",
    r"ಗುರುತಿನ ಪರಿಶೀಲನೆ",
]


def has_kyc(text: str) -> bool:
    return contains_any(text, KYC_PATTERNS)


# ============================================================
# ACTION REQUEST
# ============================================================

ACTION_PATTERNS = [
    r"\bclick\b",
    r"\bclick here\b",
    r"\bopen\b",
    r"\bdownload\b",
    r"\binstall\b",
    r"\bapply\b",
    r"\bactivate\b",
    r"\bverify\b",
    r"\bcomplete\b",
    r"\bsubmit\b",
    r"\bupdate\b",
    r"\bclaim\b",
    r"\blogin\b",
    r"\bregister\b",
    r"\bfill\b",
    r"\bcontinue\b",
    r"\baccess\b",

    # Hindi
    r"क्लिक",
    r"डाउनलोड",
    r"इंस्टॉल",
    r"आवेदन",
    r"आवेदन करें",
    r"सत्यापित",
    r"अपडेट",
    r"दावा करें",
    r"लॉगिन",
    r"रजिस्टर",
    r"जारी रखें",

    # Kannada
    r"ಕ್ಲಿಕ್",
    r"ಡೌನ್‌ಲೋಡ್",
    r"ಅನುಸ್ಥಾಪಿಸಿ",
    r"ಅರ್ಜಿ",
    r"ಪರಿಶೀಲಿಸಿ",
    r"ನವೀಕರಿಸಿ",
    r"ಲಾಗಿನ್",
    r"ನೋಂದಣಿ",
]


def has_action_request(text: str) -> bool:
    return contains_any(text, ACTION_PATTERNS)


# ============================================================
# INTERACTION REQUEST
# ============================================================

INTERACTION_PATTERNS = [
    r"\breply\b",
    r"\breply with\b",
    r"\btext\b",
    r"\bsend\b",
    r"\bcall\b",
    r"\bcontact\b",
    r"\brespond\b",
    r"\bconfirm\b",
    r"\btype\b",
    r"\bwrite\b",
    r"\bstop\b",
    r"\boptout\b",
    r"\bopt-out\b",

    # Hindi
    r"जवाब दें",
    r"उत्तर दें",
    r"लिखकर भेजें",
    r"संपर्क करें",
    r"कॉल करें",
    r"रिप्लाई",
    r"स्टॉप",

    # Kannada
    r"ಉತ್ತರಿಸಿ",
    r"ಪ್ರತಿಕ್ರಿಯಿಸಿ",
    r"ಕಳುಹಿಸಿ",
    r"ಕರೆ ಮಾಡಿ",
    r"ಸಂಪರ್ಕಿಸಿ",
]


def has_interaction(text: str) -> bool:
    return contains_any(text, INTERACTION_PATTERNS)


# ============================================================
# GOVERNMENT / AUTHORITY
# ============================================================

AUTHORITY_PATTERNS = [
    r"\bgovernment\b",
    r"\bofficial\b",
    r"\bauthority\b",
    r"\bministry\b",
    r"\bdepartment\b",
    r"\bpolice\b",
    r"\bcourt\b",
    r"\blegal\b",
    r"\bgovernment portal\b",
    r"\blicen[cs]e\b",
    r"\bpermit\b",
    r"\bpassport\b",
    r"\btax department\b",
    r"\bincome tax\b",
    r"\bimmigration\b",
    r"\bvisa\b",
    r"\bdriving licence\b",
    r"\bdriving license\b",
    r"\blicense\b",
    r"\blicence\b",

    # Hindi
    r"सरकार",
    r"सरकारी",
    r"आधिकारिक",
    r"प्राधिकरण",
    r"मंत्रालय",
    r"विभाग",
    r"पुलिस",
    r"अदालत",
    r"लाइसेंस",
    r"परमिट",
    r"पासपोर्ट",

    # Kannada
    r"ಸರ್ಕಾರ",
    r"ಸರ್ಕಾರಿ",
    r"ಅಧಿಕೃತ",
    r"ಪ್ರಾಧಿಕಾರ",
    r"ಸಚಿವಾಲಯ",
    r"ವಿಭಾಗ",
    r"ಪೊಲೀಸ್",
    r"ನ್ಯಾಯಾಲಯ",
    r"ಪರವಾನಗಿ",
    r"ಪಾಸ್‌ಪೋರ್ಟ್",
]


def has_authority_context(text: str) -> bool:
    return contains_any(text, AUTHORITY_PATTERNS)


# ============================================================
# JOB SCAM
# ============================================================

JOB_PATTERNS = [
    r"\bjob\b",
    r"\bpart[- ]?time job\b",
    r"\bwork from home\b",
    r"\bremote job\b",
    r"\bhiring\b",
    r"\brecruitment\b",
    r"\bsalary\b",
    r"\bvacancy\b",
    r"\bcareer\b",
    r"\bemployment\b",
    r"\binterview\b",
    r"\bjoining fee\b",
    r"\bregistration fee\b",

    # Hindi
    r"नौकरी",
    r"काम",
    r"भर्ती",
    r"वेतन",
    r"रोजगार",
    r"इंटरव्यू",

    # Kannada
    r"ಉದ್ಯೋಗ",
    r"ಕೆಲಸ",
    r"ನೇಮಕಾತಿ",
    r"ಸಂಬಳ",
    r"ಉದ್ಯೋಗಾವಕಾಶ",
]


def has_job_scam_context(text: str) -> bool:
    return contains_any(text, JOB_PATTERNS)


# ============================================================
# DELIVERY SCAM
# ============================================================

DELIVERY_PATTERNS = [
    r"\bparcel\b",
    r"\bpackage\b",
    r"\bcourier\b",
    r"\bdelivery\b",
    r"\bshipment\b",
    r"\bconsignment\b",
    r"\bcustoms\b",
    r"\bshipping\b",

    # Hindi
    r"पार्सल",
    r"डिलीवरी",
    r"कूरियर",
    r"शिपमेंट",

    # Kannada
    r"ಪಾರ್ಸೆಲ್",
    r"ವಿತರಣೆ",
    r"ಕೂರಿಯರ್",
    r"ಶಿಪ್‌ಮೆಂಟ್",
]


def has_delivery_context(text: str) -> bool:
    return contains_any(text, DELIVERY_PATTERNS)


# ============================================================
# INVESTMENT SCAM
# ============================================================

INVESTMENT_PATTERNS = [
    r"\binvestment\b",
    r"\binvest\b",
    r"\btrading\b",
    r"\bprofit\b",
    r"\breturns?\b",
    r"\bguaranteed returns?\b",
    r"\bdouble your money\b",
    r"\bmultibagger\b",
    r"\bstock tips?\b",
    r"\bcrypto investment\b",
    r"\bforex\b",
    r"\bpassive income\b",

    # Hindi
    r"निवेश",
    r"मुनाफा",
    r"रिटर्न",
    r"गारंटीड रिटर्न",
    r"शेयर",
    r"क्रिप्टो",

    # Kannada
    r"ಹೂಡಿಕೆ",
    r"ಲಾಭ",
    r"ಮರುಪಾವತಿ",
    r"ಖಚಿತ ಲಾಭ",
    r"ಷೇರು",
]


def has_investment_scam_context(text: str) -> bool:
    return contains_any(text, INVESTMENT_PATTERNS)


# ============================================================
# SCORING
# ============================================================

def add_score(
    score_breakdown: Dict[str, int],
    reason: str,
    points: int
) -> None:
    """
    Add points to a score category.

    The final risk_score is calculated after all rules
    using sum(score_breakdown.values()).
    """

    score_breakdown[reason] = (
        score_breakdown.get(reason, 0) + points
    )


# ============================================================
# CATEGORY CLASSIFICATION
# ============================================================

def determine_category(
    has_credentials: bool,
    has_threat: bool,
    has_payment: bool,
    has_reward: bool,
    has_kyc: bool,
    has_bank_impersonation: bool,
    has_url: bool,
    has_authority_context: bool,
    has_deadline: bool,
    has_action_request: bool,
    has_interaction: bool,
    has_job_scam_context: bool,
    has_delivery_context: bool,
    has_investment_scam_context: bool,
) -> str:

    # Highest-priority categories first.

    if has_credentials:
        return "OTP_PHISHING"

    if has_payment:
        if has_investment_scam_context:
            return "INVESTMENT_SCAM"

        if has_job_scam_context:
            return "JOB_SCAM"

        if (
            has_threat
            or has_deadline
            or has_credentials
            or has_url
            or has_action_request
        ):
            return "UPI_PAYMENT_SCAM"

    if has_kyc:
        return "KYC_PHISHING"

    if has_bank_impersonation and (
        has_threat
        or has_deadline
        or has_credentials
        or has_url
        or has_action_request
    ):
        return "BANK_IMPERSONATION"

    if has_reward:
        return "LOTTERY_SCAM"

    if has_investment_scam_context:
        return "INVESTMENT_SCAM"

    if has_job_scam_context:
        return "JOB_SCAM"

    if (
        has_delivery_context
        and has_url
        and (has_action_request or has_deadline)
    ):
        return "DELIVERY_SCAM"

    if (
        has_authority_context
        and has_url
        and (
            has_deadline
            or has_action_request
            or has_interaction
            or has_threat
        )
    ):
        return "GOVERNMENT_IMPERSONATION"

    if (
        has_url
        and (has_action_request or has_interaction)
        and (
            has_deadline
            or has_authority_context
            or has_threat
        )
    ):
        return "PHISHING"

    if has_url and (has_action_request or has_interaction):
        return "PHISHING"

    return "GENERAL_SCAM"


# ============================================================
# PSYCHOLOGY / SOCIAL ENGINEERING
# ============================================================

def determine_psychology(
    has_urgency_signal: bool,
    has_deadline: bool,
    has_authority_context: bool,
    has_threat: bool,
    has_action_request: bool,
    has_interaction: bool,
) -> List[str]:

    psychology = []

    if has_urgency_signal or has_deadline:
        psychology.append("Urgency")

    if has_authority_context:
        psychology.append("Authority")

    if has_threat:
        psychology.append("Fear or intimidation")

    if has_action_request:
        psychology.append("Pressure to act")

    if has_interaction:
        psychology.append("Social engineering")

    if has_authority_context:
        psychology.append("Impersonation")

    return psychology


# ============================================================
# EXPLANATION GENERATION
# ============================================================

def generate_explanation(
    category: str,
    language: str,
    has_url: bool,
    has_deadline: bool,
    has_action_request: bool,
    has_interaction: bool,
    has_authority_context: bool,
    has_threat: bool,
    has_credentials: bool,
    has_payment: bool,
) -> str:

    reasons = []

    if has_authority_context:
        reasons.append(
            "official or authority-related context"
        )

    if has_url:
        reasons.append(
            "an external link"
        )

    if has_deadline:
        reasons.append(
            "a deadline or time pressure"
        )

    if has_action_request:
        reasons.append(
            "a request to take an action"
        )

    if has_interaction:
        reasons.append(
            "a request to reply or interact"
        )

    if has_threat:
        reasons.append(
            "a threat or consequence"
        )

    if has_credentials:
        reasons.append(
            "a request involving sensitive credentials"
        )

    if has_payment:
        reasons.append(
            "a payment or money-transfer request"
        )

    if language in ("Hindi", "Hindi-English"):
        if category == "GOVERNMENT_IMPERSONATION":
            return (
                "यह संदेश किसी सरकारी या आधिकारिक सेवा से संबंधित "
                "होने का दावा करता है। इसमें "
                + "، ".join(reasons)
                + " जैसी संदिग्ध बातें हैं। "
                "लिंक पर क्लिक करने या जानकारी साझा करने से पहले "
                "आधिकारिक स्रोत से सत्यापन करें।"
            )

        if category == "OTP_PHISHING":
            return (
                "यह संदेश संवेदनशील सत्यापन या लॉगिन जानकारी प्राप्त "
                "करने का प्रयास कर सकता है। ऐसे संदेश में दिए गए "
                "लिंक या निर्देशों का उपयोग न करें और आधिकारिक स्रोत "
                "से सत्यापन करें।"
            )

        return (
            "इस संदेश में कई संदिग्ध संकेत पाए गए हैं, जिनमें "
            + "، ".join(reasons)
            + " शामिल हैं। आधिकारिक स्रोत से स्वतंत्र रूप से सत्यापन करें।"
        )

    if language in ("Kannada", "Kannada-English"):
        if category == "GOVERNMENT_IMPERSONATION":
            return (
                "ಈ ಸಂದೇಶವು ಸರ್ಕಾರಿ ಅಥವಾ ಅಧಿಕೃತ ಸೇವೆಯಂತೆ ಕಾಣಲು ಪ್ರಯತ್ನಿಸುತ್ತದೆ. "
                "ಇದರಲ್ಲಿ "
                + ", ".join(reasons)
                + " ಮುಂತಾದ ಅನುಮಾನಾಸ್ಪದ ಸೂಚನೆಗಳಿವೆ. "
                "ಲಿಂಕ್ ತೆರೆಯುವ ಮೊದಲು ಅಧಿಕೃತ ಮೂಲದಿಂದ ಪರಿಶೀಲಿಸಿ."
            )

        return (
            "ಈ ಸಂದೇಶದಲ್ಲಿ ಹಲವಾರು ಅನುಮಾನಾಸ್ಪದ ಸೂಚನೆಗಳು ಕಂಡುಬಂದಿವೆ: "
            + ", ".join(reasons)
            + ". ಅಧಿಕೃತ ಮೂಲದ ಮೂಲಕ ಸ್ವತಂತ್ರವಾಗಿ ಪರಿಶೀಲಿಸಿ."
        )

    # English
    if not reasons:
        return (
            "The message contains patterns that may indicate "
            "fraudulent or suspicious activity."
        )

    return (
        "This message contains multiple suspicious indicators, "
        "including "
        + ", ".join(reasons)
        + ". Verify the information through an official source "
        "before taking any action."
    )


# ============================================================
# RECOMMENDED ACTION
# ============================================================

def generate_action(
    verdict: str,
    category: str,
    language: str,
) -> str:

    if verdict == "SAFE":

        if language in ("Hindi", "Hindi-English"):
            return (
                "कोई तत्काल कार्रवाई आवश्यक नहीं है। "
                "यदि संदेश संदिग्ध लगे तो भेजने वाले की आधिकारिक स्रोत से पुष्टि करें।"
            )

        if language in ("Kannada", "Kannada-English"):
            return (
                "ತಕ್ಷಣ ಯಾವುದೇ ಕ್ರಮ ಅಗತ್ಯವಿಲ್ಲ. "
                "ಸಂದೇಶ ಅನುಮಾನಾಸ್ಪದವಾಗಿ ಕಂಡರೆ ಅಧಿಕೃತ ಮೂಲದ ಮೂಲಕ ಪರಿಶೀಲಿಸಿ."
            )

        return (
            "No immediate action is required. "
            "If the message seems suspicious, verify it through an official source."
        )

    if language in ("Hindi", "Hindi-English"):

        if category in {
            "OTP_PHISHING",
            "UPI_PAYMENT_SCAM",
            "KYC_PHISHING",
            "BANK_IMPERSONATION",
            "PHISHING",
            "GOVERNMENT_IMPERSONATION",
        }:
            return (
                "लिंक पर क्लिक या डाउनलोड न करें और संदेश का जवाब न दें। "
                "कोई OTP, पासवर्ड, बैंक विवरण या भुगतान जानकारी साझा न करें। "
                "संबंधित संस्था की आधिकारिक वेबसाइट या ऐप से जानकारी सत्यापित करें।"
            )

        return (
            "संदेश पर कार्रवाई न करें। "
            "किसी लिंक पर क्लिक करने, पैसे भेजने या व्यक्तिगत जानकारी "
            "साझा करने से पहले आधिकारिक स्रोत से सत्यापन करें।"
        )

    if language in ("Kannada", "Kannada-English"):

        if category in {
            "OTP_PHISHING",
            "UPI_PAYMENT_SCAM",
            "KYC_PHISHING",
            "BANK_IMPERSONATION",
            "PHISHING",
            "GOVERNMENT_IMPERSONATION",
        }:
            return (
                "ಲಿಂಕ್ ತೆರೆಯಬೇಡಿ ಅಥವಾ ಡೌನ್‌ಲೋಡ್ ಮಾಡಬೇಡಿ ಮತ್ತು ಸಂದೇಶಕ್ಕೆ "
                "ಪ್ರತಿಕ್ರಿಯಿಸಬೇಡಿ. OTP, ಪಾಸ್‌ವರ್ಡ್, ಬ್ಯಾಂಕ್ ವಿವರಗಳು ಅಥವಾ "
                "ಪಾವತಿ ಮಾಹಿತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. ಸಂಬಂಧಿತ ಸಂಸ್ಥೆಯ ಅಧಿಕೃತ "
                "ವೆಬ್‌ಸೈಟ್ ಅಥವಾ ಆ್ಯಪ್ ಮೂಲಕ ಪರಿಶೀಲಿಸಿ."
            )

        return (
            "ಸಂದೇಶದ ಮೇಲೆ ತಕ್ಷಣ ಕ್ರಮ ಕೈಗೊಳ್ಳಬೇಡಿ. "
            "ಲಿಂಕ್ ತೆರೆಯುವ ಅಥವಾ ಹಣ ಕಳುಹಿಸುವ ಮೊದಲು ಅಧಿಕೃತ ಮೂಲದಿಂದ ಪರಿಶೀಲಿಸಿ."
        )

    # English
    if category in {
        "OTP_PHISHING",
        "UPI_PAYMENT_SCAM",
        "KYC_PHISHING",
        "BANK_IMPERSONATION",
        "PHISHING",
        "GOVERNMENT_IMPERSONATION",
    }:
        return (
            "Do not click links, download files, or reply to the message. "
            "Do not share OTPs, passwords, bank details, or payment information. "
            "Verify the information through the organization's official website or app."
        )

    return (
        "Do not take immediate action. "
        "Verify the message independently through an official source "
        "before clicking links, sending money, or sharing personal information."
    )


# ============================================================
# MAIN SCAM DETECTOR
# ============================================================

def detect_scam(
    message: str,
    language: str = "auto",
) -> Dict:

    if message is None:
        message = ""

    # --------------------------------------------------------
    # NORMALIZE
    # --------------------------------------------------------

    text = normalize_text(message)

    # --------------------------------------------------------
    # LANGUAGE
    # --------------------------------------------------------

    detected_language = detect_language(text)

    if language != "auto":
        detected_language = language

    # --------------------------------------------------------
    # SIGNAL DETECTION
    # --------------------------------------------------------

    urls = extract_urls(text)

    has_url_signal = bool(urls)
    suspicious_url = has_suspicious_url(text)

    has_urgency_signal = has_urgency(text)
    has_deadline_signal = has_deadline(text)

    has_threat_signal = has_threat(text)

    has_credentials_signal = has_credentials(text)
    has_payment_signal = has_payment(text)

    has_bank_signal = has_bank_impersonation(text)
    has_reward_signal = has_reward(text)
    has_kyc_signal = has_kyc(text)

    has_action_signal = has_action_request(text)
    has_interaction_signal = has_interaction(text)

    has_authority_signal = has_authority_context(text)

    has_job_signal = has_job_scam_context(text)
    has_delivery_signal = has_delivery_context(text)
    has_investment_signal = has_investment_scam_context(text)

    # --------------------------------------------------------
    # RED FLAGS
    # --------------------------------------------------------

    red_flags: List[str] = []

    if has_url_signal:
        red_flags.append("External link")

    if suspicious_url:
        red_flags.append("Suspicious URL characteristics")

    if has_urgency_signal or has_deadline_signal:
        red_flags.append("Urgency or artificial deadline")

    if has_threat_signal:
        red_flags.append("Threat or consequence")

    if has_credentials_signal:
        red_flags.append("Requests sensitive credentials")

    if has_payment_signal:
        red_flags.append("Requests payment or money transfer")

    if has_bank_signal:
        red_flags.append("Bank or financial impersonation")

    if has_reward_signal:
        red_flags.append("Prize or reward claim")

    if has_kyc_signal:
        red_flags.append("KYC or identity verification request")

    if has_action_signal:
        red_flags.append("Requests user action")

    if has_interaction_signal:
        red_flags.append("Requests interaction")

    if has_authority_signal:
        red_flags.append("Authority or official context")

    if has_job_signal:
        red_flags.append("Job or employment context")

    if has_delivery_signal:
        red_flags.append("Delivery or parcel context")

    if has_investment_signal:
        red_flags.append("Investment or trading context")

    # --------------------------------------------------------
    # SCORE
    # --------------------------------------------------------

    score_breakdown: Dict[str, int] = {}

    # Individual signals

    if has_url_signal:
        add_score(
            score_breakdown,
            "External link",
            20
        )

    if suspicious_url:
        add_score(
            score_breakdown,
            "Suspicious URL",
            10
        )

    if has_urgency_signal or has_deadline_signal:
        add_score(
            score_breakdown,
            "Urgency or artificial deadline",
            10
        )

    if has_threat_signal:
        add_score(
            score_breakdown,
            "Threat or consequence",
            20
        )

    if has_credentials_signal:
        add_score(
            score_breakdown,
            "Sensitive credential request",
            30
        )

    payment_suspicious_context = (
    has_urgency_signal
    or has_deadline_signal
    or has_threat_signal
    or has_credentials_signal
    or has_url_signal
    or has_reward_signal
    or has_job_signal
    or has_investment_signal
)

    if has_payment_signal and payment_suspicious_context:
        add_score(
            score_breakdown,
            "Payment or money request",
            30
        )

    bank_suspicious_context = (
        has_urgency_signal
        or has_deadline_signal
        or has_threat_signal
        or has_credentials_signal
        or has_url_signal
        or has_action_signal
    )

    if has_bank_signal and bank_suspicious_context:
        add_score(
            score_breakdown,
            "Bank impersonation",
            15
        )    

    if has_reward_signal:
        add_score(
            score_breakdown,
            "Reward or lottery claim",
            25
        )

    if has_kyc_signal:
        add_score(
            score_breakdown,
            "KYC request",
            20
        )

    if has_action_signal:
        add_score(
            score_breakdown,
            "User action request",
            10
        )

    if has_interaction_signal:
        add_score(
            score_breakdown,
            "Interaction request",
            10
        )

    if has_authority_signal:
        add_score(
            score_breakdown,
            "Authority or official context",
            5
        )

    if has_job_signal:
        add_score(
            score_breakdown,
            "Job scam context",
            15
        )

    if has_delivery_signal:
        add_score(
            score_breakdown,
            "Delivery scam context",
            10
        )

    if has_investment_signal:
        add_score(
            score_breakdown,
            "Investment scam context",
            20
        )

    # --------------------------------------------------------
    # CONTEXTUAL COMBINATIONS
    # --------------------------------------------------------

    contextual_signals = 0

    if has_url_signal and (
        has_deadline_signal or has_urgency_signal
    ):
        add_score(
            score_breakdown,
            "Link combined with deadline",
            10
        )
        contextual_signals += 1

    if has_url_signal and has_action_signal:
        add_score(
            score_breakdown,
            "External link asks for action",
            10
        )
        contextual_signals += 1

    if has_url_signal and has_interaction_signal:
        add_score(
            score_breakdown,
            "External link combined with interaction",
            10
        )
        contextual_signals += 1

    if has_authority_signal and has_url_signal:
        add_score(
            score_breakdown,
            "Official-looking claim with external link",
            10
        )
        contextual_signals += 1

    if (
        has_authority_signal
        and has_deadline_signal
    ):
        add_score(
            score_breakdown,
            "Official-looking claim combined with deadline",
            10
        )
        contextual_signals += 1

    if (
        has_authority_signal
        and has_url_signal
        and has_deadline_signal
    ):
        add_score(
            score_breakdown,
            "Authority claim + deadline + link",
            10
        )
        contextual_signals += 1

    if (
        has_authority_signal
        and has_url_signal
        and has_action_signal
    ):
        add_score(
            score_breakdown,
            "Authority + external link + action",
            10
        )
        contextual_signals += 1

    if (
        has_payment_signal
        and has_credentials_signal
    ):
        add_score(
            score_breakdown,
            "Payment combined with credential request",
            20
        )
        contextual_signals += 1

    if (
        has_reward_signal
        and has_payment_signal
    ):
        add_score(
            score_breakdown,
            "Reward combined with payment request",
            20
        )
        contextual_signals += 1

    if (
        has_kyc_signal
        and has_url_signal
    ):
        add_score(
            score_breakdown,
            "KYC combined with external link",
            20
        )
        contextual_signals += 1

    if (
        has_kyc_signal
        and has_deadline_signal
    ):
        add_score(
            score_breakdown,
            "KYC combined with deadline",
            15
        )
        contextual_signals += 1

    if (
        has_job_signal
        and has_payment_signal
    ):
        add_score(
            score_breakdown,
            "Job context combined with payment",
            20
        )
        contextual_signals += 1

    if (
        has_investment_signal
        and has_payment_signal
    ):
        add_score(
            score_breakdown,
            "Investment context combined with payment",
            20
        )
        contextual_signals += 1

    # --------------------------------------------------------
    # COUNT COORDINATED SIGNALS
    # --------------------------------------------------------

    signal_count = sum([
        has_url_signal,
        suspicious_url,
        has_urgency_signal,
        has_deadline_signal,
        has_threat_signal,
        has_credentials_signal,
        has_payment_signal,
        has_bank_signal,
        has_reward_signal,
        has_kyc_signal,
        has_action_signal,
        has_interaction_signal,
        has_authority_signal,
        has_job_signal,
        has_delivery_signal,
        has_investment_signal,
    ])

    if signal_count >= 4:
        add_score(
            score_breakdown,
            "Multiple coordinated scam indicators",
            15
        )
        contextual_signals += 1

    # --------------------------------------------------------
    # FINAL RISK SCORE
    # --------------------------------------------------------
    #
    # IMPORTANT:
    # add_score() updates score_breakdown.
    # Therefore risk_score must be calculated here.
    #
    # This fixes the original bug where risk_score stayed 0.
    # --------------------------------------------------------

    risk_score = sum(score_breakdown.values())

    # Keep score between 0 and 100.
    risk_score = min(
        max(risk_score, 0),
        100
    )

    # --------------------------------------------------------
    # VERDICT
    # --------------------------------------------------------

    if risk_score >= 70:
        verdict = "SCAM"

    elif risk_score >= 35:
        verdict = "SUSPICIOUS"

    else:
        verdict = "SAFE"

    # --------------------------------------------------------
    # CATEGORY
    # --------------------------------------------------------

    category = determine_category(
        has_credentials=has_credentials_signal,
        has_threat=has_threat_signal,
        has_payment=has_payment_signal,
        has_reward=has_reward_signal,
        has_kyc=has_kyc_signal,
        has_bank_impersonation=has_bank_signal,
        has_url=has_url_signal,
        has_authority_context=has_authority_signal,
        has_deadline=has_deadline_signal,
        has_action_request=has_action_signal,
        has_interaction=has_interaction_signal,
        has_job_scam_context=has_job_signal,
        has_delivery_context=has_delivery_signal,
        has_investment_scam_context=has_investment_signal,
    )

    # --------------------------------------------------------
    # PSYCHOLOGY
    # --------------------------------------------------------

    psychology = determine_psychology(
        has_urgency_signal=has_urgency_signal,
        has_deadline=has_deadline_signal,
        has_authority_context=has_authority_signal,
        has_threat=has_threat_signal,
        has_action_request=has_action_signal,
        has_interaction=has_interaction_signal,
    )

    # --------------------------------------------------------
    # CONFIDENCE
    # --------------------------------------------------------

    confidence = 0.45

    confidence += min(
        signal_count * 0.06,
        0.30
    )

    confidence += min(
        contextual_signals * 0.03,
        0.15
    )

    if suspicious_url:
        confidence += 0.05

    if risk_score >= 80 or risk_score <= 15:
        confidence += 0.05

    confidence = min(
        max(confidence, 0.0),
        0.99
    )

    confidence = round(
        confidence,
        2
    )

    # --------------------------------------------------------
    # EXPLANATION
    # --------------------------------------------------------

    explanation = generate_explanation(
        category=category,
        language=detected_language,
        has_url=has_url_signal,
        has_deadline=has_deadline_signal,
        has_action_request=has_action_signal,
        has_interaction=has_interaction_signal,
        has_authority_context=has_authority_signal,
        has_threat=has_threat_signal,
        has_credentials=has_credentials_signal,
        has_payment=has_payment_signal,
    )

    # --------------------------------------------------------
    # RECOMMENDED ACTION
    # --------------------------------------------------------

    recommended_action = generate_action(
        verdict=verdict,
        category=category,
        language=detected_language,
    )

    # --------------------------------------------------------
    # FINAL RESPONSE
    # --------------------------------------------------------

    return {
        "message": message,
        "risk_score": risk_score,
        "verdict": verdict,
        "category": category,
        "language": detected_language,
        "red_flags": red_flags,
        "psychology": psychology,
        "score_breakdown": score_breakdown,
        "confidence": confidence,
        "explanation": explanation,
        "recommended_action": recommended_action,
        "extracted_text": message,
    }


# ============================================================
# SIMPLE TEST
# ============================================================

if __name__ == "__main__":

    test_message = """
    टेक्स्ट संदेश

    आज पूर्वाहन 11:12
    आपके Hales कैरी लाइसेंस
    (concealed carry license)
    के लिए आवेदन करने की अंतिम
    तिथि 29 मई है। इसे डाउनलोड
    करने में 15 मिनट का समय
    लगता है
    https://a.fazcompany.com/
    9765q9n
    बाहर होने (OPTOUT) के लिए
    Stop लिखकर उत्तर दें।
    """

    result = detect_scam(test_message)

    import json

    print(
        json.dumps(
            result,
            indent=4,
            ensure_ascii=False
        )
    )