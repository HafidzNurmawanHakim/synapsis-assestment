export interface PostBlogPayload {
   data: {
      title: string;
      content: string;
   };
}

export interface BlogResponse {
   id: string;
   title: string;
   content: string;
}

export interface GetBlogPayload {
   id: string;
}

export interface UpdateBlogPayload {
   id: string;
   data: {
      title?: string;
      content?: string;
   };
}

export interface DeleteBlogPayload {
   id: string;
}

export interface Author {
   id: number;
   name: string;
   email: string;
   gender: string;
   status: string;
}

export interface Blog {
   id: string;
   user_id: string;
   title: string;
   body: string;
   author: Author | null;
}

export interface UserComment {
   id: number;
   post_id: number;
   name: string;
   email: string;
   body: string;
}

export interface Users {
   id: number;
   name: string;
   email: string;
   gender: string;
   status: string;
}

export interface AddUser {
   name: string;
   email: string;
   gender: string;
   status: string;
}
