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
  DegreeLevel,
  DiplomaStatus,
  ICreateDiplomaItem,
  ICreateDiplomasBatchPayload,
  ICreateDiplomasBatchResponse,
  ICreateQrTokenPayload,
  IAttachMyDiplomaResponse,
  IDiplomaUserToken,
  IUniversityDiploma,
  IUpdateDiplomaStatusPayload,
  IDiploma,
  IUniversityShort,
  QrTokenType,
} from "./model/type";
