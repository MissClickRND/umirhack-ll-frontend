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
  IUniversityDiploma,
  IUpdateDiplomaStatusPayload,
  IDiploma,
  IUniversityShort,
} from "./model/type";

export { DegreeLevel } from "./model/type";
