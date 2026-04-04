export interface Diploma {
    id: string | number;
    institution: string;
    specialty: string;
    year: string;
    diplomaNumber: string;
    status: boolean;
}

export interface LinkHistoryItem {
  id: string | number;
  diplomaNumber: string;
  token: string;
  createdAt: string;
  validUntil: string;
  status: "active" | "revoked" | "expired";
}