import { UserRole } from "@/entities/user/model/type";

type HeaderLink = {
  label: string;
  path: string;
  roles?: UserRole[];
};

export const links: HeaderLink[] = [
  { label: "Главная", path: "/" },
  { label: "Интеграция API", path: "/public-api" },
  { label: "Личный кабинет", path: "/student", roles: [UserRole.STUDENT] },
  { label: "Панель администратора", path: "/admin", roles: [UserRole.ADMIN] },
  {
    label: "Панель управления",
    path: "/edu-panel",
    roles: [UserRole.UNIVERSITY],
  },
];

export function canAccessLink(link: HeaderLink, role?: UserRole) {
  if (!link.roles || link.roles.length === 0) {
    return true;
  }

  return !!role && link.roles.includes(role);
}
