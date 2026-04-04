enum UserRole {
  HR = "HR",
  STUDENT = "Студент",
  ADMIN = "Админ",
  UNIVERSITY = "ВУЗ",
  NEED_VERIFICATION = "Ждет подтверждения",
}

export interface IUserState {
  id?: number;
  email?: string;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserPublic {
  id: number;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface IUniversityShort {
  id: string;
  name: string;
  shortName: string;
}

export interface IVerificationUser extends IUserPublic {
  university: IUniversityShort | null;
}

export type VerifyAction = "approve" | "reject";

export interface IVerifyRequestPayload {
  action: VerifyAction;
}

export interface IUpdateRolePayload {
  userId: number;
  role: UserRole;
}

export interface IRoleChangeSnapshot {
  id: number;
  email: string;
  role: UserRole;
}

export interface IRoleChangeResponse {
  before: IRoleChangeSnapshot;
  after: IRoleChangeSnapshot;
}

export interface IAttachedDiplomaResponse {
  id: string;
  userId: number;
  universityId: string;
  status: string;
}
