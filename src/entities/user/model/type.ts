export type UserRole =
  | "HR"
  | "STUDENT"
  | "ADMIN"
  | "UNIVERSITY"
  | "NEED_VERIFICATION";

export interface IUserState {
  id?: number;
  email?: string;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
