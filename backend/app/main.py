from fastapi import FastAPI
from app.api.routes.analyze import router as analyze_router

app = FastAPI(title="ScamShield API")

app.include_router(
    analyze_router,
    prefix="/api"
)


@app.get("/")
def root():
    return {
        "message": "ScamShield API is running"
    }