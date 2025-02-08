import { apiSlice } from "./apiSlice";
const ADMIN_API='/api/admin'

export const adminApiSlice = apiSlice.injectEndpoints({
   endpoints:(builder)=>({
    adminLogin:builder.mutation({
        query:(data)=>({
            url:`${ADMIN_API}/login`,
            method:'POST',
            body:data
        })
    }),
    usersList:builder.mutation({
        query:(data)=>({
            url:`${ADMIN_API}/usersList`,
            method:'GET',
            body:data
        })
    }),
    users:builder.mutation({
        query:(data)=>({
            url:`${ADMIN_API}/userEdit`,
            method:'GET',
            body:data
        })
    }),
    editUser:builder.mutation({
        query:(data)=>({
            url:`${ADMIN_API}/userEdit`,
            method:'PUT',
            body:data
        })
    }),
    deleteUser:builder.mutation({
        query:(data)=>({
            url:`${ADMIN_API}/deleteUser`,
            method:'POST',
            body:data
        })
    }),
    createUser:builder.mutation({
        query:(data)=>({
            url:`${ADMIN_API}/createUser`,
            method:'POST',
            body:data
        })
    }),
   })
});

export const {
    useAdminLoginMutation,
    useUsersListMutation,
    useUsersMutation,
    useEditUserMutation,
    useDeleteUserMutation,
    useCreateUserMutation,
  } = adminApiSlice;