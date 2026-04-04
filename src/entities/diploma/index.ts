export {
  useCreateDiplomaBatchMutation,
  useGetUniversityDiplomasQuery,
  useUpdateDiplomaStatusMutation,
  useGetDiplomaByIdQuery,
  useLazyGetDiplomaByIdQuery,
} from "./api/diplomaApi";

export type {
  DegreeLevel,
  DiplomaStatus,
  ICreateDiplomaItem,
  ICreateDiplomasBatchPayload,
  ICreateDiplomasBatchResponse,
  IUniversityDiploma,
  IUpdateDiplomaStatusPayload,
  IDiploma,
  IUniversityShort
} from "./model/type";
