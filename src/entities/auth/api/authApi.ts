import { baseApi } from "@/shared/api";
import {
  ILoginRequest,
  IRegisterStudentRequest,
  IRegisterUniversityRequest,
  IStatusResponse,
} from "../model/type";
import { IUserState } from "@/entities/user";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    universityRegister: build.mutation<
      { user: IUserState },
      IRegisterUniversityRequest
    >({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: {
          accountType: data.accountType,
          email: data.email,
          password: data.password,
          name: data.name,
          short_name: data.short_name,
        },
      }),
      invalidatesTags: [
        { type: "User", id: "LIST" },
        { type: "User", id: "VERIFY_REQUESTS" },
      ],
    }),

    studentRegister: build.mutation<
      { user: IUserState },
      IRegisterStudentRequest
    >({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: {
          accountType: data.accountType,
          email: data.email,
          password: data.password,
        },
      }),
      invalidatesTags: [
        { type: "User", id: "LIST" },
        { type: "User", id: "VERIFY_REQUESTS" },
      ],
    }),

    login: build.mutation<{ user: IUserState }, ILoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    status: build.query<IStatusResponse, void>({
      query: () => "/auth/status",
      providesTags: [{ type: "User" }],
    }),
  }),
});

export const {
  useUniversityRegisterMutation,
  useStudentRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useStatusQuery,
} = authApi;
