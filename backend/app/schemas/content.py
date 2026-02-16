from pydantic import BaseModel

class ContentCreate(BaseModel):
    title: str
    description: str
    content_type: str

class ContentResponse(BaseModel):
    id: int
    title: str
    description: str
    content_type: str

    class Config:
        orm_mode = True
