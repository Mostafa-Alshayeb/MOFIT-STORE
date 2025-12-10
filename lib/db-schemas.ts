export interface DBUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface SessionData {
  userId: string;
  email: string;
  name: string;
  expiresAt: number;
}
