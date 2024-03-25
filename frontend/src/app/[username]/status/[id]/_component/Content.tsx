"use client"

import Image from 'next/image'
import { useQuery } from "@tanstack/react-query"
import {getSinglePost} from '@/app/_lib/posts'
import {PostProps} from '@/app/models/post'
import { BsPersonCircle } from "react-icons/bs"

type Props = {
    params: { id: string, username: string}
}

const Content = ({params}: Props) => {
    const {id} = params

    const { data, isLoading } = useQuery<PostProps, Object, PostProps, [_1: string, _2: string]>({
        queryKey: ['posts', id],
        queryFn: getSinglePost,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    })
    
    console.log(data)
    
    return (
        <section className="content">
            <article className="detail">
                <div className="detail__userInfo">
                    <div className='detail__profile'>
                        {isLoading ? (
                            <>
                                <div className='btn-user skeleton-loading'></div>
                                <p className='skeleton-loading'></p>
                            </>
                        ) : (
                            <>
                                <button type="button" className='btn-user'>
                                    {data?.User.image?.length !== 0 
                                        ? <>
                                            {   
                                                data?.User.type === 'uploads'
                                                    ? <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/${data?.User.image}`} width={32} height={32} alt="프로필 이미지" />
                                                    : <Image src={`${data?.User.image}`} width={32} height={32} alt="프로필 이미지" />
                                                
                                            }
                                        </> 
                                        : <BsPersonCircle size={32} color="#dfdfdf" />
                                    }
                                </button>
                                <p>{data?.User.userID}</p>
                            </>
                        )}
                    </div>
                </div>
                <header className="detail__header">
                    {isLoading ? <h1 className='skeleton-loading'></h1> : <h1>{data?.title}</h1>}
                </header>
                <article className="detail__content">
                    {isLoading ? <>
                        <p className='skeleton-loading'></p>
                        <p className='skeleton-loading'></p>
                        <p className='skeleton-loading'></p>
                    </> : <p>{data?.content}</p>}
                </article>
            </article>
        </section>
    )
}

export default Content