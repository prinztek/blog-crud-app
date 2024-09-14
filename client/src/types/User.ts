export type UserProfileToken = {
  user_id: number;
  username: string;
  email: string;
  created_at: string; // ISO 8601 date string
  token: string;
};

export type UserProfile = {
  user_id: number;
  username: string;
  email: string;
  created_at: string; // ISO 8601 date string
};
