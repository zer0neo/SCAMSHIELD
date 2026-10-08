from pydantic import BaseModel


class AnalyzeRequest(BaseModel):
    message: str
    language: str = "auto"