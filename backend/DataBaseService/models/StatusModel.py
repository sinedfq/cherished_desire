from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base
from .WishModel import Wish

class Status(Base):
    __tablename__ = "statuses"

    id = Column(Integer, primary_key=True, index=True)
    wish_id = Column(Integer, ForeignKey('wishes.id'), index=True)
    name = Column(String, index=True)

    wish = relationship("Wish", back_populates="statuses")