from fastapi import APIRouter

from app.schemas.analyze import AnalyzeRequest
from app.services.detector import detect_scam

router = APIRouter()


@router.post("/analyze")
def analyze_message(request: AnalyzeRequest):
    return detect_scam(
        request.message,
        request.language
    )