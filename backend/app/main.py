from fastapi import FastAPI
from app.api.routes import user, content

app = FastAPI()

app.include_router(user.router)
app.include_router(content.router)
