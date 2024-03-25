"use server"

import Main from '../home/page'
import {auth} from "@/auth";
import { ReadonlyURLSearchParams } from "next/navigation";

const Page = async ({searchParams} : {searchParams : ReadonlyURLSearchParams}) => {

    const sessionData = await auth();
    
    return <Main session={sessionData} searchParams={searchParams}  />
}

export default Page

