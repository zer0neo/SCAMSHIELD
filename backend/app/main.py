from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.analyze import router as analyze_router
from app.api.routes.ocr import router as ocr_router
from app.api.routes.upi import router as upi_router


app = FastAPI(
    title="ScamShield API",
    description="Vernacular Scam and UPI Fraud Message Shield",
    version="1.0.0"
)

# Enable CORS for local development and deployed frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    analyze_router,
    prefix="/api",
    tags=["Text Analysis"]
)

app.include_router(
    ocr_router,
    prefix="/api",
    tags=["Screenshot OCR"]
)

app.include_router(
    upi_router,
    prefix="/api",
    tags=["UPI Simulation"]
)


@app.get("/")
def root():
    return {
        "message": "ScamShield API is running",
        "version": "1.0.0"
    }