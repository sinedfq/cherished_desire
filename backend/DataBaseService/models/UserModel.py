from sqlalchemy import Column, Enum, Integer, String
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String(20), unique=True, index=True, nullable=False)
    role = Column(Enum("riddler", "executor", "moderator"), index=True)

    hashed_password = Column(String(255), nullable=False)

    wishes = relationship("Wish", back_populates="user")