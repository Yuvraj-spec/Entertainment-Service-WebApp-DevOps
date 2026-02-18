from app.db.session import SessionLocal, engine
from app.db.base import Base

# Import models here so they are registered
from app.models import user, content

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
