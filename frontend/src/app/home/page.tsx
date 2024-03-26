export const config = {
  runtime: 'edge',
};

import Header from "../_component/common/Header";
import Aside from "../_component/common/Aside"
import Search from '..//_component/form/search/Search';
import {auth} from "@/auth";
import SearchResultPosts from "../_component/form/SearchResultPosts";
import Posts from "../_component/form/Posts";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getPosts } from "../_lib/posts";


type MainProps = {
  searchParams?: { q: string, f?: string, pf?: string };
}

export default async function Main ({searchParams}: MainProps){
  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery({
      queryKey: ['posts'], 
      queryFn: getPosts,
      initialPageParam: 0
  })
  
  const dehydratedState = dehydrate(queryClient)
  
  const session = await auth();
  
  return (
    <div id="wrap">
      <Header user={session} />
      <main className="container">
        <section className="content">
          <div className="post__wrap">
            <div className="post__header">
              <h2 className="tit">최근 게시글</h2>
              <Search />
            </div>
            <HydrationBoundary state={dehydratedState}>
              {searchParams ? <SearchResultPosts searchParams={searchParams}/> :  <Posts />}
            </HydrationBoundary>
          </div>
        </section>
        <Aside session={session}/>
      </main>
    </div>
  )   
}