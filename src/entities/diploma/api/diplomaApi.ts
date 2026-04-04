import { baseApi } from "@/shared/api";
import {
  ICreateDiplomasBatchPayload,
  ICreateDiplomasBatchResponse,
  IDiploma,
  IUniversityDiploma,
  IUniversityDiplomasResponse,
  IUpdateDiplomaStatusPayload,
} from "../model/type";

export const diplomaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDiplomaBatch: build.mutation<
      ICreateDiplomasBatchResponse,
      ICreateDiplomasBatchPayload
    >({
      query: (body) => ({
        url: "/diplomas/batch",
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, payload) => {
        const tags: Array<{ type: "Diploma"; id: string }> = [
          { type: "Diploma", id: "UNIVERSITY_LIST" },
        ];

        for (const universityId of new Set(
          payload.diplomas.map((diploma) => diploma.universityId),
        )) {
          tags.push({ type: "Diploma", id: `UNIVERSITY_${universityId}` });
        }

        return tags;
      },
    }),

    getUniversityDiplomas: build.query<
      IUniversityDiplomasResponse,
      { universityId: number; page?: number; limit?: number; search?: string }
    >({
      query: ({ universityId, page = 1, limit = 10, search }) => ({
        url: "/diplomas/university",
        params: {
          universityId,
          page,
          limit,
          search: search?.trim() || undefined,
        },
      }),
      providesTags: (_result, _error, { universityId }) => [
        { type: "Diploma", id: "UNIVERSITY_LIST" },
        { type: "Diploma", id: `UNIVERSITY_${universityId}` },
      ],
    }),

    updateDiplomaStatus: build.mutation<
      IUniversityDiploma,
      IUpdateDiplomaStatusPayload
    >({
      query: ({ id, status }) => ({
        url: `/diplomas/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, payload) => [
        { type: "Diploma", id: "UNIVERSITY_LIST" },
        { type: "Diploma", id: `UNIVERSITY_${payload.universityId}` },
      ],
    }),

    getDiplomaById: build.query<IDiploma, string>({
      query: (number) => ({
        url: "/diplomas/search",
        params: { number },
      }),
    }),
  }),
});

export const {
  useCreateDiplomaBatchMutation,
  useGetUniversityDiplomasQuery,
  useUpdateDiplomaStatusMutation,
  useGetDiplomaByIdQuery,
  useLazyGetDiplomaByIdQuery,
} = diplomaApi;
