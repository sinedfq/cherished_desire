# main.py или где у вас роут
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models import SessionLocal, Wish, SessionLocal, Wish, Base, engine
from schemas import MakeWish

app = FastAPI(title="Загадать желание")
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/wish/add", status_code=status.HTTP_201_CREATED)
async def make_wish(wish: MakeWish, db: Session = Depends(get_db)):

    db_wish = Wish(
        user_id=wish.user_id,
        title=wish.title,
        wish_text=wish.wish_text,
        age_category=wish.age_category,
        phone=wish.phone,
        telegram=wish.telegram,
        email=wish.email,
        video_id=wish.video_id,
    )
    
    try:
        db.add(db_wish)
        db.commit()
        db.refresh(db_wish)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Ошибка создания желания: {str(e)}")

    return {
        "message": "Wish created successfully",
        "wish_id": db_wish.id,
        "video_id": db_wish.video_id
    }