import { baseApi } from "@/shared/api";
import {
  IAttachMyDiplomaResponse,
  ICreateQrTokenPayload,
  ICreateDiplomasBatchPayload,
  ICreateDiplomasBatchResponse,
  IDiploma,
  IDiplomaUserToken,
  IUniversityDiploma,
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

    getUniversityDiplomas: build.query<IUniversityDiploma[], number>({
      query: (universityId) => `/diplomas/university/${universityId}`,
      providesTags: (_result, _error, universityId) => [
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
    
// ДЛЯ СТУДЕНТА

    getUserDiplomas: build.query<IUniversityDiploma[], number>({
      query: (userId) => `/diplomas/user/${userId}`,
      providesTags: (_result, _error, userId) => [
        { type: "Diploma", id: "USER_DIPLOMAS" },
        { type: "Diploma", id: `USER_DIPLOMAS_${userId}` },
      ],
    }),

    createDiplomaQrToken: build.mutation<IDiplomaUserToken, ICreateQrTokenPayload>({
      query: ({ id, type }) => ({
        url: `/diplomas/${id}/qr-token`,
        method: "POST",
        body: { type },
      }),
      invalidatesTags: [{ type: "Diploma", id: "USER_TOKENS" }],
    }),

    revokeDiplomaQrToken: build.mutation<{ success: boolean }, number>({
      query: (tokenId) => ({
        url: `/diplomas/qr-token/${tokenId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Diploma", id: "USER_TOKENS" }],
    }),

    getUserDiplomaTokens: build.query<IDiplomaUserToken[], number>({
      query: (userId) => `/diplomas/${userId}/list`,
      providesTags: [{ type: "Diploma", id: "USER_TOKENS" }],
    }),

    attachMyDiploma: build.mutation<IAttachMyDiplomaResponse, { id: number }>({
      query: ({ id }) => ({
        url: `/users/me/diplomas/${id}/attach`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Diploma", id: "USER_DIPLOMAS" }],
    }),

    
  }),
});

export const {
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
} = diplomaApi;
