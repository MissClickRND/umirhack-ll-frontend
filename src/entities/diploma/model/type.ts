export const DegreeLevel = {
  BACHELOR: "Бакалавриат",
  MAGISTRACY: "Магистратура",
  SPECIALIST: "Специалитет",
  DOCTORATE: "Докторантура",
} as const;

export type DegreeLevel = keyof typeof DegreeLevel;

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

export interface IDiplomaPaginationMeta {
  page: number;
  limit: number;
  itemsOnPage: number;
  total: number;
  totalPages: number;
}

export interface IUniversityDiplomasResponse {
  data: IUniversityDiploma[];
  meta: IDiplomaPaginationMeta;
}

export interface IUpdateDiplomaStatusPayload {
  id: number;
  universityId: number;
  status: DiplomaStatus;
}

export interface IDiploma {
  id: number;
  fullNameAuthor: string;
  registrationNumber: string;
  userId: number;
  universityId: number;
  issuedAt: string;
  specialty: string;
  degreeLevel: DegreeLevel;
  status: DiplomaStatus;
  createdAt: string;
  updatedAt: string;
  university: IUniversityShort;
}

export interface IDiplomaByQrTokenResponse {
  id: number;
  fullNameAuthor: string;
  registrationNumber: string;
  userId: number;
  universityId: number;
  issuedAt: string;
  specialty: string;
  degreeLevel: DegreeLevel;
  status: DiplomaStatus;
  createdAt: string;
  updatedAt: string;
  university: IUniversityInfo;
}

export interface IUniversityShort {
    id: number,
    name: string,
    shortName: string,
    createdAt: string,
    updatedAt: string
}

export type QrTokenType = "ONETIME" | "DAYS_7" | "DAYS_30" | "INFINITE";

export interface ICreateQrTokenPayload {
  id: number;
  type: QrTokenType;
}

export interface IDiplomaUserToken {
  id: number;
  diplomaId: number;
  token: string;
  type: QrTokenType;
  isRevoked: boolean;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IDiplomaUserTokenMeta {
  id: number;
  diplomaId: number;
  expiresAt: string | null;
  revokedAt: string | null;
  isOneTime: boolean;
  lastUsedAt: string | null;
  createdAt: string;
}

export interface IUserDiplomaTokenItem {
  token: string;
  tokenMeta: IDiplomaUserTokenMeta;
  diploma: IUniversityDiploma;
}

export interface IAttachMyDiplomaResponse {
  id: number;
  userId: number;
  universityId: number;
  status: DiplomaStatus;
}
