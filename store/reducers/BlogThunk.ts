import {
   BlogResponse,
   DeleteBlogPayload,
   GetBlogPayload,
   PostBlogPayload,
   UpdateBlogPayload,
} from "@/types/blog";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Assuming you have a PublicRequest setup like this
const PublicRequest = axios.create({
   baseURL: "your_api_base_url",
   headers: {
      "Content-Type": "application/json",
   },
});

export const PostBlog = createAsyncThunk<BlogResponse, PostBlogPayload>(
   "blog/PostBlog",
   async (val, thunkAPI) => {
      const { data } = val;
      console.log({ val, data });
      try {
         const response = await PublicRequest({
            url: `/post`,
            method: "POST",
            data,
         });
         return response.data;
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data);
      }
   }
);

export const GetBlog = createAsyncThunk<BlogResponse, GetBlogPayload>(
   "blog/GetBlog",
   async (val, thunkAPI) => {
      try {
         const response = await PublicRequest({
            url: `/post/${val.id}`,
            method: "GET",
         });
         return response.data;
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data);
      }
   }
);

export const UpdateBlog = createAsyncThunk<BlogResponse, UpdateBlogPayload>(
   "blog/UpdateBlog",
   async (val, thunkAPI) => {
      try {
         const response = await PublicRequest({
            url: `/post/${val.id}`,
            method: "PUT",
            data: val.data,
         });
         return response.data;
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data);
      }
   }
);

export const DeleteBlog = createAsyncThunk<{ id: string }, DeleteBlogPayload>(
   "blog/DeleteBlog",
   async (val, thunkAPI) => {
      try {
         await PublicRequest({
            url: `/post/${val.id}`,
            method: "DELETE",
         });
         return { id: val.id };
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data);
      }
   }
);
