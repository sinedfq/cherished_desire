from sqlalchemy import create_engine, text
from sqlalchemy import Column, DateTime, Integer, String, ForeignKey, Text, Date, func
from sqlalchemy.orm import relationship, declarative_base, sessionmaker


SQLALCHEMY_DATABASE_URL = "postgresql://postgres:1234@localhost/cherishedWish"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Wish(Base):
    __tablename__ = "wishes"

    id = Column(Integer, primary_key=True)
    user_id = Column(String, index=True)
    title = Column(String)
    wish_text = Column(Text)
    status = Column(String, nullable=False, index=True, default="Created")
    age_category = Column(String, nullable=False)
    telegram = Column(String)
    phone = Column(String)
    email = Column(String)
    created_at = Column(DateTime, default=func.now(), index=True)
    video_id = Column(String)
