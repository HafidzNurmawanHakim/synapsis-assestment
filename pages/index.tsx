import DefaultLayout from "@/layouts/default";
import { Blog } from "../types/blog";
import BlogCard from "./blog/blogCard";
import type { InferGetStaticPropsType, GetServerSideProps } from "next";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/router";

type BlogProps = {
   content: Blog[];
   currentPage?: number;
};

export default function IndexPage({
   BlogUtils: { content, currentPage },
}: InferGetStaticPropsType<typeof getServerSideProps>) {
   const router = useRouter();
   return (
      <DefaultLayout>
         <section className="flex items-center justify-center gap-4 py-8 md:py-10">
            <div className="container max-w-3xl">
               {content.map((_: Blog, key: number) => (
                  <BlogCard content={_} key={_.id} />
               ))}
               <div className="w-full flex justify-end p-2">
                  <Pagination
                     total={content.length}
                     onChange={(page) => router.push(`?page=${page}`)}
                     initialPage={currentPage}
                  />
               </div>
            </div>
         </section>
      </DefaultLayout>
   );
}

export const getServerSideProps = (async ({ query: { page = 1 } }) => {
   const getBlog = await fetch(`${process.env.BASE_URL}/posts?page=${page}&per_page=20`);
   const data = await getBlog.json();

   const mergeData: Blog[] = await Promise.all(
      data.map(async (item: Blog) => {
         const user = await fetch(`${process.env.BASE_URL}/users/${item.user_id}`);
         const author = await user.json();
         if (!Object.keys(author).includes("name")) {
            return { ...item, author: null };
         }
         return { ...item, author };
      })
   );

   const currentPage = +page;
   const { meta } = data;

   return {
      props: {
         BlogUtils: {
            content: mergeData,
            currentPage,
         },
      },
   };
}) satisfies GetServerSideProps<{ BlogUtils: BlogProps }>;
