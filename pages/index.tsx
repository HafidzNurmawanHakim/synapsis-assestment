import DefaultLayout from "@/layouts/default";
import Image from "next/image";
import { title } from "@/components/primitives";
import clsx from "clsx";
import { baseFont } from "@/config/fonts";

export default function IndexPage({}) {
   return (
      <DefaultLayout>
         <section className="flex items-center justify-center gap-4 py-8 md:py-10">
            <div className="container max-w-3xl">
               <div className="w-full flex">
                  <div className="w-full initial">
                     <h1 className={title()}>Hi, </h1>
                     <h1 className={title()}>Im Hafidz</h1>
                     <div>
                        <p className={clsx(baseFont.className, "mt-4")}>Welcome to my blog post!</p>
                     </div>
                  </div>
                  <div className="w-[600px] relative">
                     <div
                        className="w-full absolute  top-0 left-0 bg-gradient-to-r from-indigo-600 bottom-0 z-0 via-pink-600 to-purple-600"
                        style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
                     ></div>
                     <Image
                        className="relative z-10"
                        src={"/ava.png"}
                        alt="ava"
                        width={360}
                        height={540}
                     />
                  </div>
               </div>
            </div>
         </section>
      </DefaultLayout>
   );
}
