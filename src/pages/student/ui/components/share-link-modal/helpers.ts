import { Diploma } from "../../../model/type";
import { PLACEHOLDER_LINK } from "./constants";

export const getDiplomaLabel = (diploma: Diploma | null): string => {
  if (!diploma) {
    return "";
  }

  return `${diploma.diplomaNumber} - ${diploma.institution} - ${diploma.specialty}`;
};

export const isLinkGenerated = (link: string): boolean => link !== PLACEHOLDER_LINK;
