"use client"

import { Fragment, useEffect } from 'react';
import Image from 'next/image'
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { BsPersonCircle } from "react-icons/bs"
import { GoCommentDiscussion } from "react-icons/go"
import {getPosts} from '@/app/_lib/posts'
import {PostProps} from '@/app/models/post'

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ko from "dayjs/locale/ko";
import Link from 'next/link';
import { useInView } from 'react-intersection-observer'

import backUrl from '@/config'

dayjs.extend(relativeTime);
dayjs.locale(ko);

const Post = () => {

    const { data, isLoading, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<PostProps[], Object, InfiniteData<PostProps[]>, [_1: string], number>({
        queryKey: ['posts'],
        queryFn: getPosts,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    })

    const { ref, inView } = useInView({
        threshold: 0,
        delay: 0
    });

    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [isFetching, hasNextPage, inView, fetchNextPage])

    console.log(data)
    
    return (
        <div className="post">
            <div className="post__content">
                {isLoading && (
                    <div className="post__item skeleton-loading">
                        <div className="post__thum"></div>
                        <dl>
                            <dt></dt>
                            <dd>
                                <ul className="d-list">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                )}
                
                {data && 
                    data.pages?.map((page, index) => {
                        return (
                            <Fragment key={index}> 
                                {
                                page.map((post, index) => {
                                    return (
                                        <div className="post__item" key={index}>
                                            <div className="post__thum">
                                                <Link href={`${post.User.userID}/status/${post.postId}`}>
                                                    <Image src={`${post.Images[0].link}`} width={80} height={80} alt='' priority />
                                                </Link>
                                            </div>
                                            <dl>
                                                <dt><Link href={`${post.User.userID}/status/${post.postId}`}>{post.title}</Link></dt>
                                                <dd>
                                                    <ul className="d-list">
                                                        <li>
                                                            {
                                                                post.User.image ? (
                                                                    <div className="user-img">
                                                                        {
                                                                            post.User.type === 'uploads' 
                                                                                ? <Image src={`${backUrl}/${post.User.image}`} width={16} height={16} alt='' priority />
                                                                                : <Image src={`${post.User.image}`} width={16} height={16} alt='' priority />
                                                                        }
                                                                        
                                                                    </div>
                                                                ) : (
                                                                    <BsPersonCircle size={16} color="#dfdfdf" />
                                                                )
                                                            }
                                                            {post.User.userID}
                                                        </li>
                                                        <li>
                                                            <GoCommentDiscussion size={12} />
                                                            <span className="co-number">{post.Comments.length}</span>
                                                        </li>
                                                        <li>{dayjs(post.createdAt).toNow(true)}</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                            {/* <button type="button" className="btn-like">
                                                <IoIosHeartEmpty size={18} color="#e2757a" />
                                                <span className="like-number">{post.Hearts.length}</span>
                                            </button> */}
                                        </div>
                                    )    
                                })
                            }
                            </Fragment>
                        )   
                })}
                <div ref={ref} className='observer'></div>
            </div>
        </div>
    )
}

export default Post