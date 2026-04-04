export type DegreeLevel =
  | "BACHELOR"
  | "MAGISTRACY"
  | "SPECIALIST"
  | "DOCTORATE";

export type DiplomaStatus = "ISSUED" | "VALID" | "REVOKED";

export interface ICreateDiplomaItem {
  fullNameAuthor: string;
  registrationNumber: string;
  universityId: number;
  userId?: number;
  issuedAt: string;
  specialty: string;
  degreeLevel: DegreeLevel;
}

export interface ICreateDiplomasBatchPayload {
  diplomas: ICreateDiplomaItem[];
}

export interface ICreateDiplomasBatchResponse {
  count: number;
}

export interface IUniversityInfo {
  id: number;
  name: string;
  shortName: string | null;
}

export interface IUniversityDiploma {
  id: number;
  fullNameAuthor: string;
  registrationNumber: string;
  universityId: number;
  userId: number | null;
  issuedAt: string;
  specialty: string;
  degreeLevel: DegreeLevel;
  status: DiplomaStatus;
  createdAt: string;
  updatedAt: string;
  university: IUniversityInfo;
}

export interface IUpdateDiplomaStatusPayload {
  id: number;
  universityId: number;
  status: DiplomaStatus;
}
