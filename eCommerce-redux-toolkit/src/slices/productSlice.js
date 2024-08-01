
import { PRODUCTS_URL } from "../constant";
import { apiSLice } from "./apiSlice";


export const productSlice = apiSLice.injectEndpoints({
    endpoints:(builder) => ({
        // getProducts:builder.query({
        //     query: ({keyword,pageNumber}) => ({
        //         url:PRODUCTS_URL,
        //         // url:`${USERS_URL}/test`,
        //         params:{
        //             keyword,
        //             pageNumber
        //         }
        //     }),
        //     providesTags:['Products'], 
        //     keepUnusedDataFor:5
        // }),
        getProducts:builder.query({
            query: (params) => ({
                url:PRODUCTS_URL,
                params:{
                    keyword:params?.keyword,
                    pageNumber:params?.pageNumber,
                    "category":params?.category,
                    "rating":params?.rating,
                    "price[gte]":params.min,
                    "price[lte]":params.max,
                }
            }),
            providesTags:['Products'], 
            keepUnusedDataFor:5
        }),
        getProductDetail:builder.query({
            query:(productId) => ({
                url:`${PRODUCTS_URL}/${productId}`,
            }),
            providesTags: ["Product"],
            keepUnusedDataFor:5
        }),
        getTopProducts:builder.query({
            query:() => ({
                url:`${PRODUCTS_URL}/top`
            }),
            keepUnusedDataFor:5
        }),
        createProduct:builder.mutation({
            query:(data) =>({
                url:`${PRODUCTS_URL}`,
                method:'POST',   
                body:data
            }),
            invalidatesTags:['Products']
        }),
        uploadProductImage:builder.mutation({
            query:({id,body})=>({
                url:`${PRODUCTS_URL}/${id}/upload_images`,
                method:'PUT',
                body
            }),
            invalidatesTags:['Product']
        }),
        deleteProductImage:builder.mutation({
            query:({id,body})=>({
                url:`${PRODUCTS_URL}/${id}/delete_image`,
                method:'PUT',
                body
            }),
            invalidatesTags:['Product']
        }),
        updateProduct:builder.mutation({
            query({ id, body }) {
                return {
                  url: `${PRODUCTS_URL}/${id}`,
                  method: "PUT",
                  body,
                };
              },
            invalidatesTags:['Products']
        }),
        deleteProduct:builder.mutation({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
                method:'DELETE'
            })
        }),
        // createReview:builder.mutation({
        //     query:(data)=>({
        //         url:`${PRODUCTS_URL}/${data.productId}/reviews`,
        //         method:'POST',
        //         body:data
        //     }),
        //     invalidatesTags:['Products']
        // })
        canUserReview:builder.query({
            query:(productId) => ({
                url:`${PRODUCTS_URL}/canReview?productId=${productId}`,
            }),
            invalidatesTags: ['Products'],
        }),
        createReviews: builder.mutation({
            query: (data) => ({
              url: `${PRODUCTS_URL}/${data.productId}/reviews`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags: ['Products'],
          }),
    })
});

export const { 
    useGetProductsQuery,
    useGetProductDetailQuery,
    useGetTopProductsQuery,
    useCreateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductImageMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCanUserReviewQuery,
    useCreateReviewsMutation
    
 } = productSlice;