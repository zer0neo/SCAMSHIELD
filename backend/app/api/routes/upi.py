from fastapi import APIRouter

from app.schemas.upi import UPIRequest
from app.services.detector import detect_scam

router = APIRouter()


@router.post("/analyze-upi")
def analyze_upi(request: UPIRequest):

    simulated_message = (
        f"UPI payment request from {request.sender_name}. "
        f"Amount ₹{request.amount}. "
        f"Request type: {request.request_type}. "
        f"{request.message}"
    )

    result = detect_scam(simulated_message)

    # UPI is a payment mechanism, not automatically a scam.
    # Only add the UPI flag if the request is actually a UPI
    # collect/payment/request transaction.
    if request.request_type.lower() in [
        "collect",
        "payment",
        "request"
    ]:
        if "Payment or UPI request" not in result["red_flags"]:
            result["red_flags"].append(
                "Payment or UPI request"
            )

    # Keep the original risk score from the scam detector.
    # Do NOT add a fixed +30 for every UPI transaction.

    # Recalculate verdict from the actual risk score.
    if result["risk_score"] > 65:
        result["verdict"] = "SCAM"
    elif result["risk_score"] > 30:
        result["verdict"] = "SUSPICIOUS"
    else:
        result["verdict"] = "SAFE"

    # Only classify as UPI scam when the message actually
    # contains meaningful scam indicators.
    if result["risk_score"] > 30:
        result["category"] = "UPI_PAYMENT_SCAM"

    result["recommended_action"] = (
        "Do not approve the UPI request or send money."
        if result["risk_score"] > 65
        else
        "Verify the sender and payment details before approving."
    )

    result["input_type"] = "upi_simulation"
    result["amount"] = request.amount
    result["sender_name"] = request.sender_name

    return result