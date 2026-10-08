from fastapi import APIRouter, File, UploadFile, Query, HTTPException

from app.services.ocr import extract_text_from_image
from app.services.detector import detect_scam


router = APIRouter()


@router.post("/analyze-image")
async def analyze_image(
    file: UploadFile = File(...),
    language: str = Query("auto")
):
    try:
        image_data = await file.read()

        extracted_text = extract_text_from_image(
            image_data,
            language
        )

        if not extracted_text:
            raise HTTPException(
                status_code=400,
                detail="No text could be extracted from the image."
            )

        result = detect_scam(
            extracted_text,
            language
        )

        result["extracted_text"] = extracted_text

        return result

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"OCR processing failed: {str(e)}"
        )