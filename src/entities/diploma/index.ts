export {
  useCreateDiplomaBatchMutation,
  useGetUniversityDiplomasQuery,
  useUpdateDiplomaStatusMutation,
  useGetDiplomaByIdQuery,
  useLazyGetDiplomaByIdQuery,
  useGetDiplomaByQrTokenQuery,
  useLazyGetDiplomaByQrTokenQuery,
  useGetUserDiplomasQuery,
  useCreateDiplomaQrTokenMutation,
  useRevokeDiplomaQrTokenMutation,
  useGetUserDiplomaTokensQuery,
  useAttachMyDiplomaMutation,
} from "./api/diplomaApi";

export type {
  DiplomaStatus,
  ICreateDiplomaItem,
  ICreateDiplomasBatchPayload,
  ICreateDiplomasBatchResponse,
  IDiplomaPaginationMeta,
  ICreateQrTokenPayload,
  IAttachMyDiplomaResponse,
  IDiplomaUserToken,
  IDiplomaUserTokenMeta,
  IUserDiplomaTokenItem,
  IUniversityDiploma,
  IUniversityDiplomasResponse,
  IUpdateDiplomaStatusPayload,
  IDiploma,
  IDiplomaByQrTokenResponse,
  IUniversityShort,
  QrTokenType,
} from "./model/type";

export { DegreeLevel } from "./model/type";
