export { userLogout, setUser, userReducer, userSlice } from "./model/userSlice";
export {
  useGetUsersQuery,
  useGetVerifyRequestsQuery,
  useVerifyRequestMutation,
  useUpdateRoleUserMutation,
  useAttachMyDiplomaMutation,
} from "./api/userApi";
export type {
  IAttachedDiplomaResponse,
  IPaginationMeta,
  IRoleChangeResponse,
  IUpdateRolePayload,
  IUserPublic,
  IUsersListResponse,
  IUserState,
  IVerificationUser,
  IVerifyRequestPayload,
  UserRole,
  VerifyAction,
} from "./model/type";
