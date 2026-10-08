from pydantic import BaseModel


class UPIRequest(BaseModel):
    sender_name: str
    amount: float
    message: str = ""
    request_type: str = "collect"