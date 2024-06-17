import { AddIcon, SearchIcon, TrashIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { AddUser, Users } from "@/types/blog";
import { Avatar, Badge, Button, Card, CardBody, CardHeader, Chip, Input } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import AddModal from "./addModal";
import { useState } from "react";
import axios from "axios";

const { TOKEN } = process.env;

interface UserPageProps {
   allUser: Users[];
}

const searchInput = (
   <Input
      aria-label="Search"
      classNames={{
         inputWrapper: "bg-default-100",
         input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
         <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
   />
);

export default function UsersPage({
   UserPageProps: { allUser },
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
   const router = useRouter();

   const [data, setData] = useState<AddUser>({
      name: "",
      email: "",
      gender: "",
      status: "active",
   });

   const handleSubmit = async (type: "add" | "delete" | "edit", id?: number) => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${process.env.TOKEN}`,
            },
         };

         let response;

         if (type === "add") {
            response = await axios.post(`${process.env.BASE_URL}/users`, data, config);
         } else if (type === "delete" && id) {
            response = await axios.delete(`${process.env.BASE_URL}/users/${id}`, config);
         } else if (type === "edit" && id) {
            response = await axios.put(`${process.env.BASE_URL}/users/${id}`, data, config);
         } else {
            return "notOk";
         }

         if (
            (type === "add" && response.status === 201) ||
            (type === "delete" && response.status === 204) ||
            (type === "edit" && response.status === 200)
         ) {
            router.replace(router.asPath);
            setData({
               email: "",
               name: "",
               gender: "",
               status: "",
            });
            return "ok";
         }

         return "notOk";
      } catch (error) {
         return "notOk";
      }
   };

   return (
      <DefaultLayout>
         <section className="flex flex-col items-center justify-center gap-4 ">
            <div className="container max-w-3xl">
               <div className="flex justify-between items-center">
                  <h1 className={title()}>Users</h1>
                  <div className="w-60 flex gap-2">
                     {searchInput}
                     <AddModal
                        data={data}
                        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                        onSubmit={() => handleSubmit("add")}
                        type="add"
                        setData={setData}
                     />
                  </div>
               </div>
               <div className=" w-full mt-10 gap-2 flex flex-wrap">
                  {allUser.map((user: Users, key: number) => {
                     return (
                        <Card className="w-[32%] rounded-md relative" key={user.id}>
                           <div className="p-2">
                              <AddModal
                                 onSubmit={() => handleSubmit("delete", user.id)}
                                 type="delete"
                                 setData={setData}
                              />
                           </div>
                           <div className="absolute p-2 right-0">
                              <AddModal
                                 data={data}
                                 setData={setData}
                                 onChange={(e) =>
                                    setData({ ...data, [e.target.name]: e.target.value })
                                 }
                                 onSubmit={() => handleSubmit("edit", user.id)}
                                 type="edit"
                                 user={user}
                              />
                           </div>

                           <CardHeader className="gap-2 justify-center cursor-pointer pb-0">
                              <Badge
                                 isInvisible={user.status === "active"}
                                 content=""
                                 color="success"
                                 placement="bottom-right"
                              >
                                 <Avatar
                                    size="lg"
                                    onClick={() => {
                                       router.push(`/users/${user.id}`);
                                    }}
                                 />
                              </Badge>
                           </CardHeader>
                           <CardBody>
                              <div className="text-center">
                                 <p className="text-sm">{user.name}</p>
                                 <p className="text-sm text-gray-400">{user.email}</p>
                                 <Chip
                                    size="sm"
                                    variant="flat"
                                    className="rounded-md mt-2"
                                    color={user.gender === "female" ? "primary" : "danger"}
                                 >
                                    {user.gender}
                                 </Chip>
                              </div>
                           </CardBody>
                        </Card>
                     );
                  })}
               </div>
            </div>
         </section>
      </DefaultLayout>
   );
}

export const getServerSideProps = (async () => {
   const getUsers = await fetch(`${process.env.BASE_URL}/users?access-token=${process.env.TOKEN}`);
   const allUser = await getUsers.json();

   return {
      props: {
         UserPageProps: {
            allUser,
         },
      },
   };
}) satisfies GetServerSideProps<{ UserPageProps: UserPageProps }>;
