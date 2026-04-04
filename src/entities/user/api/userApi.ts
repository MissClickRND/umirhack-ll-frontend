import { baseApi } from "@/shared/api";
import {
  IAttachedDiplomaResponse,
  IUsersListResponse,
  IRoleChangeResponse,
  IUpdateRolePayload,
  IVerificationUser,
  IVerifyRequestPayload,
} from "../model/type";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<
      IUsersListResponse,
      { page?: number; limit?: number; search?: string } | void
    >({
      query: (params) => ({
        url: "/users",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          search: params?.search?.trim() || undefined,
        },
      }),
      providesTags: [{ type: "User", id: "LIST" }],
    }),

    getVerifyRequests: build.query<IVerificationUser[], void>({
      query: () => "/verify",
      providesTags: [{ type: "User", id: "VERIFY_REQUESTS" }],
    }),

    verifyRequest: build.mutation<
      IRoleChangeResponse,
      { id: number; body: IVerifyRequestPayload }
    >({
      query: ({ id, body }) => ({
        url: `/verify/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [
        { type: "User", id: "LIST" },
        { type: "User", id: "VERIFY_REQUESTS" },
      ],
    }),

    updateRoleUser: build.mutation<IRoleChangeResponse, IUpdateRolePayload>({
      query: (body) => ({
        url: "/users/role",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [
        { type: "User", id: "LIST" },
        { type: "User", id: "PROFILE" },
        { type: "User", id: "VERIFY_REQUESTS" },
      ],
    }),

    attachMyDiploma: build.mutation<IAttachedDiplomaResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/users/me/diplomas/${id}/attach`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "User", id: "PROFILE" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetVerifyRequestsQuery,
  useVerifyRequestMutation,
  useUpdateRoleUserMutation,
  useAttachMyDiplomaMutation,
} = userApi;
