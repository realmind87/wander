"use server"

import Main from '../home/page'
import {auth} from "@/auth";
import { ReadonlyURLSearchParams } from "next/navigation";

type MainProps = {
searchParams?: { q: string, f?: string, pf?: string };
}

const Page = async ({searchParams} : MainProps) => {

    return <Main searchParams={searchParams}  />
}

export default Page

