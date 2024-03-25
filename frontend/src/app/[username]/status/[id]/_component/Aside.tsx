"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import {getAsidePosts} from '@/app/_lib/posts'
import {PostProps} from '@/app/models/post'

const Aside = () => {
    const { data, isLoading } = useQuery<PostProps[]>({
        queryKey: ['aside'],
        queryFn: getAsidePosts,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    })
    
    return (
        <aside>
            <dl className="notice-terms">
                <dt>최근 게시글</dt>
                <dd>
                    {isLoading && <p className='txt-nodata'>불러오고 있습니다</p>}

                    {data &&
                        data.length !== 0 
                            ? (
                                <ul className="terms-list">
                                    {
                                        data?.map((post, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link href={`${post.postId}`} className="notice-link">{post.title}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            )
                            : (
                                <p className='txt-nodata'>최근 게시글이 없습니다.</p>
                            )
                        
                    }
                </dd>
            </dl>
        </aside>
    )
}

export default Aside