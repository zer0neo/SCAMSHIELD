from fastapi import APIRouter
from app.schemas.analyze import AnalyzeRequest

router = APIRouter()


@router.post("/analyze")
def analyze_message(request: AnalyzeRequest):
    return {
        "message_received": request.message
    }