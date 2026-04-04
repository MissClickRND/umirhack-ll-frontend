export {
  useCreateDiplomaBatchMutation,
  useGetUniversityDiplomasQuery,
  useUpdateDiplomaStatusMutation,
} from "./api/diplomaApi";

export type {
  DegreeLevel,
  DiplomaStatus,
  ICreateDiplomaItem,
  ICreateDiplomasBatchPayload,
  ICreateDiplomasBatchResponse,
  IUniversityDiploma,
  IUpdateDiplomaStatusPayload,
} from "./model/type";
