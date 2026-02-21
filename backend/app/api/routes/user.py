from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.crud.user import create_user
from app.api.deps import get_db
from app.models.user import User
from app.core.security import verify_password, create_access_token

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

from app.schemas.token import TokenResponse

@router.post("/login/", response_model=TokenResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": db_user.email})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "message": "Login success"
    }