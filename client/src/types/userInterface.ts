export interface User {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: string; // ISO 8601 date string
}
