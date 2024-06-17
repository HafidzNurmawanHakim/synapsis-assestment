import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteBlog, GetBlog, PostBlog, UpdateBlog } from "../BlogThunk";
import { Blog } from "@/types/blog";

interface StateType {
   status: "loading" | "error" | "success";
   dataBlog: {
      data: Blog[];
      loading: false;
   };
}

const initialState: StateType = {
   status: "loading",
   dataBlog: {
      data: [],
      loading: false,
   },
};

const BlogSlice = createSlice({
   name: "Blog",
   initialState,
   reducers: {
      setDataBlog: (state, action: PayloadAction<{ loading: boolean; data: Blog[] }>) => {
         state.dataBlog = {
            ...state.dataBlog,
            data: action.payload.data,
            loading: false,
         };
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(PostBlog.pending, (state) => {
            state.status = "loading";
         })
         .addCase(PostBlog.fulfilled, (state, action) => {
            state.status = "success";
            // Handle fulfilled state if needed
         })
         .addCase(PostBlog.rejected, (state) => {
            state.status = "error";
         });
      builder
         .addCase(GetBlog.pending, (state) => {
            state.status = "loading";
         })
         .addCase(GetBlog.fulfilled, (state, action) => {
            state.status = "success";
            // Handle fulfilled state if needed
         })
         .addCase(GetBlog.rejected, (state) => {
            state.status = "error";
         });

      builder
         .addCase(UpdateBlog.pending, (state) => {
            state.status = "loading";
         })
         .addCase(UpdateBlog.fulfilled, (state, action) => {
            state.status = "success";
            // Handle fulfilled state if needed
         })
         .addCase(UpdateBlog.rejected, (state) => {
            state.status = "error";
         });

      builder
         .addCase(DeleteBlog.pending, (state) => {
            state.status = "loading";
         })
         .addCase(DeleteBlog.fulfilled, (state, action) => {
            state.status = "success";
            // Handle fulfilled state if needed
         })
         .addCase(DeleteBlog.rejected, (state) => {
            state.status = "error";
         });
   },
});

export const { setDataBlog } = BlogSlice.actions;
export default BlogSlice.reducer;
