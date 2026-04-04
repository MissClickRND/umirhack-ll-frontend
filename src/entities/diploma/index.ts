export {
  useCreateDiplomaBatchMutation,
  useGetUniversityDiplomasQuery,
  useUpdateDiplomaStatusMutation,
  useGetDiplomaByIdQuery,
  useLazyGetDiplomaByIdQuery,
} from "./api/diplomaApi";

export type {
  DiplomaStatus,
  ICreateDiplomaItem,
  ICreateDiplomasBatchPayload,
  ICreateDiplomasBatchResponse,
  IDiplomaPaginationMeta,
  IUniversityDiploma,
  IUniversityDiplomasResponse,
  IUpdateDiplomaStatusPayload,
  IDiploma,
  IUniversityShort,
} from "./model/type";

export { DegreeLevel } from "./model/type";
