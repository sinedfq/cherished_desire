from pydantic import BaseModel
from typing import Optional

class MakeWish(BaseModel):
    user_id: str                   
    title: str
    wish_text: str
    age_category: str
    phone: Optional[str] = None
    telegram: Optional[str] = None
    email: Optional[str] = None
    video_id: str                  