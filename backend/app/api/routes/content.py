from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.schemas.content import ContentCreate, ContentResponse
from app.crud.content import create_content, search_content
from app.api.deps import get_db
from app.api.deps_auth import get_current_user
router = APIRouter(prefix="/content", tags=["Content"])

@router.post("/", response_model=ContentResponse)
def add_content(
    content: ContentCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    return create_content(db, content)

@router.get("/", response_model=List[ContentResponse])
def list_content(
    q: Optional[str] = Query(default=None, description="Search by title"),
    content_type: Optional[str] = Query(default=None, description="Filter by content type"),
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    return search_content(db, q=q, content_type=content_type)