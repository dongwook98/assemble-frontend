export interface User {
  id: number;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}
