export interface IDiploma {
    id: number;
    fullNameAuthor: string;
    registrationNumber: string;
    userId: number;
    universityId: number;
    issuedAt: string;
    specialty: string;
    degreeLevel: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    university: IUniversityShort;
}

export interface IUniversityShort {
    id: number,
    name: string,
    shortName: string,
    createdAt: string,
    updatedAt: string
}

export interface IDiplomasBatchPayload {
  diplomas: IDiplomaBatch[];
}

export interface IDiplomaBatch {
  fullNameAuthor: string;
  registrationNumber: string;
  universityId: number;
  userId: number;
  issuedAt: string;
  specialty: string;
  degreeLevel: string;
}

export interface IDiplomaBatchResponse {
    count: number
}


