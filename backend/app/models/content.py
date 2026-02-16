from sqlalchemy import Column, Integer, String, Text
from app.db.base import Base

class Content(Base):
    __tablename__ = "content"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150))
    description = Column(Text)
    content_type = Column(String(20))
