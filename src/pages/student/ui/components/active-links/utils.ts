import { IUserDiplomaTokenItem } from "@/entities/diploma";
import { buildVerificationLink } from "../share-link-modal/utils";
import { ActiveLinkRow, LinkStatus } from "./types";

export const formatDate = (value: string | null): string => {
  if (!value) {
    return "Бессрочно";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return "-";
  }

  return parsed.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatValidUntilLabel = (item: IUserDiplomaTokenItem): string => {
  if (item.tokenMeta.isOneTime) {
    return "До первого использования";
  }

  return formatDate(item.tokenMeta.expiresAt);
};

export const getTokenStatus = (item: IUserDiplomaTokenItem): LinkStatus => {
  if (item.tokenMeta.revokedAt) {
    return "revoked";
  }

  const expiresAt = item.tokenMeta.expiresAt
    ? new Date(item.tokenMeta.expiresAt).getTime()
    : null;
  const isExpiredByTime = Boolean(expiresAt && expiresAt <= Date.now());
  const isUsedOneTime = item.tokenMeta.isOneTime && Boolean(item.tokenMeta.lastUsedAt);

  if (isExpiredByTime || isUsedOneTime) {
    return "expired";
  }

  return "active";
};

export const truncateMiddle = (value: string, maxLength = 34): string => {
  if (value.length <= maxLength) {
    return value;
  }

  const prefixLength = Math.ceil((maxLength - 3) / 2);
  const suffixLength = Math.floor((maxLength - 3) / 2);

  return `${value.slice(0, prefixLength)}...${value.slice(value.length - suffixLength)}`;
};

export const mapTokensToRows = (tokens: IUserDiplomaTokenItem[]): ActiveLinkRow[] => {
  return tokens.map((item) => {
    const link = buildVerificationLink(item.token);
    const status = getTokenStatus(item);

    return {
      ...item,
      link,
      shortLink: truncateMiddle(link),
      diplomaNumber: item.diploma.registrationNumber,
      createdAtLabel: formatDate(item.tokenMeta.createdAt),
      validUntilLabel: formatValidUntilLabel(item),
      status,
    };
  });
};
