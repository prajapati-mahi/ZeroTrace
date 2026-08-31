from fastapi import FastAPI
from api.routes import router

app = FastAPI(
    title="ZeroTrace AI Engine",
    version="1.0.0"
)

app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "ZeroTrace AI Engine Running 🚀"
    }