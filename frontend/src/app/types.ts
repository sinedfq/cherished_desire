export type UserRole = 'загадывающий' | 'исполнитель' | 'модератор';

export type WishStatus = 'moderation' | 'published' | 'rejected' | 'fulfilled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  wishesCreated: number;
  wishesFulfilled: number;
}

export interface Wish {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  videoUrl: string;
  title: string;
  description: string;
  ageCategory?: string;
  status: WishStatus;
  contactPhone?: string;
  contactTelegram?: string;
  contactEmail?: string;
  createdAt: Date;
  rejectionReason?: string;
  fulfilledBy?: string;
  fulfilledAt?: Date;
}
