export type IUserRoles = 'common' | 'admin';

export interface IUserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  roles: IUserRoles[];
}

export interface IUserState {
  user: IUserData | null;
}

export interface IUserGetters {
  user(state: IUserState): IUserData | null;
}

export interface ISignUpPayload {
  user: {
    name: string;
    email: string;
    password: string;
  };
}

export interface ILoginPayload {
  user: {
    email: string;
    password: string;
  };
  remember: boolean;
}
