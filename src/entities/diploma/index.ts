export {
  useCreateDiplomaBatchMutation,
  useGetUniversityDiplomasQuery,
  useUpdateDiplomaStatusMutation,
  useGetDiplomaByIdQuery,
  useLazyGetDiplomaByIdQuery,
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
  IUniversityDiploma,
  IUniversityDiplomasResponse,
  IUpdateDiplomaStatusPayload,
  IDiploma,
  IUniversityShort,
  QrTokenType,
} from "./model/type";

export { DegreeLevel } from "./model/type";
