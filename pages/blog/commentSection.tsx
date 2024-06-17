import { baseFont } from "@/config/fonts";
import { UserComment } from "@/types/blog";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import { FC } from "react";

interface CommentSectionProps {
   comments: UserComment;
}

const CommentSection: FC<CommentSectionProps> = ({ comments }) => {
   return (
      <Card className="w-full rounded-md shadow-none my-1 bg-[#0f0f0f]">
         <CardHeader className="gap-2 pb-0">
            <Avatar size="sm" />
            {comments.name}
         </CardHeader>
         <CardBody className={clsx("text-sm text-gray-400", baseFont.className)}>
            {comments.body}
         </CardBody>
      </Card>
   );
};

export default CommentSection;
