import { title } from "@/components/primitives";
import { baseFont } from "@/config/fonts";
import DefaultLayout from "@/layouts/default";
import { Blog, UserComment } from "@/types/blog";
import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
import CommentSection from "./commentSection";

interface BlogIndexProps {
   id?: string | string[] | null;
   data: Blog;
   userComments: UserComment[];
}

export default function BlogIndex({
   BlogIndex: { data, id, userComments },
}: InferGetStaticPropsType<typeof getServerSideProps>) {
   return (
      <DefaultLayout>
         <section className="flex flex-col items-center justify-center gap-4  ">
            <div className="max-w-3xl rounded-md">
               <div className="bg-gradient-to-r h-40 rounded-md from-indigo-600 via-pink-600 to-purple-600 flex items-end">
                  <div className="w-full p-4 gap-2 flex items-center">
                     <Avatar />
                     {data.author ? data.author?.name : "Unknown User"}
                  </div>
               </div>
               <div className="text-lg my-4">{data.title}</div>
               <div className={clsx("text-sm my-4", baseFont.className)}>{data.body}</div>
               <div className="mt-20 mx-10">
                  {userComments?.map((item: UserComment) => (
                     <CommentSection comments={item} key={item.id} />
                  ))}
               </div>
            </div>
         </section>
      </DefaultLayout>
   );
}

export const getServerSideProps = (async ({ query: { id = null } }) => {
   const getBlog = await fetch(`${process.env.BASE_URL}/posts/${id}`);
   const getComments = await fetch(`${process.env.BASE_URL}/posts/${id}/comments`);
   const data: Blog = await getBlog.json();
   const getUser = await fetch(`${process.env.BASE_URL}/users/${data.user_id}`);
   const userData = await getUser.json();
   const userComments = await getComments.json();

   return {
      props: {
         BlogIndex: {
            id,
            data: { ...data, author: !Object.keys(userData).includes("name") ? null : userData },
            userComments,
         },
      },
   };
}) satisfies GetServerSideProps<{ BlogIndex: BlogIndexProps }>;
