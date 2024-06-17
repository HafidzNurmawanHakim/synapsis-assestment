import { baseFont } from "@/config/fonts";
import { Author, Blog } from "@/types/blog";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import Link from "next/link";

interface BlogCardProps {
   content: Blog;
}
export default function BlogCard({ content }: BlogCardProps) {
   return (
      <Card key={content.id} className="my-1 rounded-md">
         <CardHeader>
            <Link href={`/blog/${content.id}`}>{content.title}</Link>
         </CardHeader>
         <CardBody className={clsx(baseFont.className, "text-sm text-gray-400")}>
            {content.body}
         </CardBody>
         <CardFooter className="gap-2 text-sm text-gray-500">
            <Avatar size="sm" />
            {content.author ? content.author.name : "Unknown"}
         </CardFooter>
      </Card>
   );
}
