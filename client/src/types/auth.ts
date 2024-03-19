export type AuthStatus = 'unknown' | 'guest' | 'logged';

export type BackendUser = {
  id: number;
  name: string;
  email: string;
};

export type UserType =
  | { status: 'unknown' }
  | { status: 'guest' }
  | ({
      status: 'logged';
    } & BackendUser);

export type AuthState = {
  accessToken: string;
  user: UserType;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type SignupForm = LoginForm & { name: string };

export type BackendAuth = { accessToken: string; user: BackendUser };
