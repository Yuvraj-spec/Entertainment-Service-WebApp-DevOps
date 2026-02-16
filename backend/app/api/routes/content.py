from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.content import ContentCreate, ContentResponse
from app.crud.content import create_content
from app.api.deps import get_db

router = APIRouter(prefix="/content", tags=["Content"])

@router.post("/", response_model=ContentResponse)
def add_content(content: ContentCreate, db: Session = Depends(get_db)):
    return create_content(db, content)
