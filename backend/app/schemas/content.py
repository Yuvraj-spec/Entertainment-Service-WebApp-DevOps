from pydantic import BaseModel, ConfigDict
from typing import Optional


class ContentCreate(BaseModel):
    title: str
    description: str
    content_type: str


class ContentResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    content_type: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)