import React, {
   ChangeEvent,
   ChangeEventHandler,
   Dispatch,
   FormEvent,
   SetStateAction,
   useState,
} from "react";
import {
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Button,
   useDisclosure,
   Input,
   Select,
   SelectItem,
} from "@nextui-org/react";
import { AddIcon, EditIcon, TrashIcon } from "@/components/icons";
import { AddUser, Users } from "@/types/blog";

interface AddModalProps {
   onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
   data?: AddUser;
   onSubmit: () => Promise<string>;
   type: "add" | "edit" | "delete";
   setData: Dispatch<SetStateAction<AddUser>>;
   user?: Users;
}

export default function AddModal({ onChange, data, onSubmit, type, setData, user }: AddModalProps) {
   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
   const [loading, setLoading] = useState(false);

   const handleClose = async () => {
      setLoading(true);
      const res = await onSubmit();
      if (res === "ok") {
         setLoading(false);
         return onClose();
      }
      return setLoading(false);
   };

   const handleEdit = () => {
      setData((prev) => ({ ...prev, ...user }));
      return onOpen();
   };
   const handleCancel = () => {
      setData({
         email: "",
         name: "",
         gender: "",
         status: "",
      });
      return onClose();
   };

   return (
      <>
         {type === "add" ? (
            <Button isIconOnly onClick={onOpen}>
               <AddIcon width={20} height={20} />
            </Button>
         ) : type === "delete" ? (
            <Button isIconOnly size="sm" variant="flat" onClick={onOpen}>
               <TrashIcon width={20} height={20} />
            </Button>
         ) : (
            <Button isIconOnly size="sm" variant="flat" onClick={handleEdit}>
               <EditIcon width={20} height={20} />
            </Button>
         )}
         <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader className="flex flex-col gap-1">
                        {type === "add" ? "Tambah" : type === "edit" ? "Edit" : "Delete"} User
                     </ModalHeader>
                     <ModalBody>
                        {type === "add" || type === "edit" ? (
                           <>
                              <Input
                                 size={"sm"}
                                 type="text"
                                 name="name"
                                 label="Name"
                                 onChange={onChange}
                                 defaultValue={data?.name}
                              />
                              <Input
                                 size={"sm"}
                                 type="email"
                                 label="Email"
                                 name="email"
                                 onChange={onChange}
                                 defaultValue={data?.email}
                              />
                              <Select
                                 label="Select gender"
                                 className="max-w-xs"
                                 name="gender"
                                 onChange={onChange}
                                 defaultSelectedKeys={[data?.gender ?? ""]}
                              >
                                 <SelectItem key={"male"} value={"male"}>
                                    Male
                                 </SelectItem>
                                 <SelectItem key={"female"} value={"female"}>
                                    Female
                                 </SelectItem>
                              </Select>
                           </>
                        ) : (
                           <>Apa Kamu Yakin?</>
                        )}
                     </ModalBody>
                     <ModalFooter>
                        <Button
                           color="danger"
                           isLoading={loading}
                           variant="light"
                           onPress={handleCancel}
                        >
                           Close
                        </Button>
                        <Button color="primary" isLoading={loading} onPress={handleClose}>
                           Action
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>
      </>
   );
}
