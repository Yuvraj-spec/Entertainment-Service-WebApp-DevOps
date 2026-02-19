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

@router.post("/login/")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    print("Input email:", user.email)
    print("User found:", db_user)

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    print("Stored hash:", db_user.password_hash)

    if not verify_password(user.password, db_user.password_hash):
        print("Password verification failed")
        raise HTTPException(status_code=400, detail="Invalid credentials")

    return {"message": "Login success"}

