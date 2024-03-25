import { IoArrowBackSharp } from "react-icons/io5";
import LoginButton from '@/app/_component/form/LoginButton';
import UserInfo from '@/app/_component/form/UserInfo';
import { BsPersonCircle } from 'react-icons/bs';
import {auth} from "@/auth";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getAsidePosts } from '@/app/_lib/posts'
import Aside from "./_component/Aside";
import Content from "./_component/Content";
import BackButton from "./_component/BackButton";

type Props = {
    params: { id: string, username: string }
}

const Page: React.FC<Props> = async ({params}) => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['aside'], 
        queryFn: getAsidePosts
    })
    const dehydratedState = dehydrate(queryClient)
    const session = await auth();
    
    return (
        <div className="wrap">
            <header className="header">
                <div className="header__inner">
                    <BackButton />
                    {!session ? <LoginButton /> : <UserInfo user={session} />}
                </div>
            </header>
            <main className="container">
                <HydrationBoundary state={dehydratedState}>
                    <Content params={params}/>
                    <Aside />
                </HydrationBoundary>
            </main>
        </div>
        
    )
}

export default Page