import { baseApi } from "@/shared/api";
import { IDiploma, IDiplomaBatchResponse, IDiplomasBatchPayload } from "../model/type";

export const diplomaApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getDiplomaById: build.query<IDiploma, string>({
            query: (number) => ({
                url: "/diplomas/search",
                params: { number },
            }),
        }),

        batchDiplomas: build.mutation<IDiplomaBatchResponse, IDiplomasBatchPayload>({
            query: (body) => ({
                url: "/diplomas/batch",
                method: "POST",
                body: body ,
            }), 
        })

    })
});

export const {
    useGetDiplomaByIdQuery,
    useLazyGetDiplomaByIdQuery,
    useBatchDiplomasMutation
} = diplomaApi

