from sqlalchemy import Column, DateTime, Integer, String, ForeignKey, Text, Date, func
from sqlalchemy.orm import relationship
from ..database import Base
from .UserModel import User

class Wish(Base):
    __tablename__ = "wishes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), index=True)
    wish_text = Column(Text, index=True)
    status = Column(String, index=True, nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    video_path = Column(String, index=True, unique=True)

    user = relationship("User", back_populates="wishes")
    statuses = relationship("Status", back_populates="wish")