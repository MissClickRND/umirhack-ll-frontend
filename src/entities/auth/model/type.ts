import { UserRole } from "@/entities/user/model/type";

export interface IRegisterUniversityRequest {
  accountType: "university";
  email: string;
  password: string;
  name: string;
  short_name: string;
}
export interface IRegisterStudentRequest {
  accountType: "student";
  email: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

interface UserStatus {
  id: number;
  email: string;
  role: UserRole;
  universityId?: number | null;
  university_id?: number | null;
}

export interface IStatusResponse {
  authenticated: boolean;
  user: UserStatus;
}
