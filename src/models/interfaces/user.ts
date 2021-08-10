import { UserRoleEnum } from '../enums/user';

export interface IUserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  role: UserRoleEnum;
}

export interface IUserState {
  user: IUserData | null;
}

export interface IUserGetters {
  user(state: IUserState): IUserData | null;
}
