import { IUserDiplomaTokenItem } from "@/entities/diploma";

export type LinkStatus = "active" | "revoked" | "expired";

export interface ActiveLinkRow extends IUserDiplomaTokenItem {
  link: string;
  shortLink: string;
  diplomaNumber: string;
  createdAtLabel: string;
  validUntilLabel: string;
  status: LinkStatus;
}
