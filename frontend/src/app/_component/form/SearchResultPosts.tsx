"use client"

import Image from 'next/image'

import { useQuery } from "@tanstack/react-query";
import { BsPersonCircle } from "react-icons/bs"
import { GoCommentDiscussion } from "react-icons/go"
import { IoIosHeartEmpty } from "react-icons/io"
import {getSearchPosts} from '@/app/_lib/posts'
import {PostProps as IPost} from '@/app/models/post'

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ko from "dayjs/locale/ko";
import Link from 'next/link';

dayjs.extend(relativeTime);
dayjs.locale(ko);

type Props = {
    searchParams: { q: string, f?: string, pf?: string };
}

const SearchResultPosts: React.FC<Props> = ({searchParams}) => {
    const { data, isLoading } = useQuery<IPost[], Object, IPost[], [_1: string, Props['searchParams']]>({
        queryKey: ['search', searchParams],
        queryFn: getSearchPosts,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    })
    
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
                
                {
                    data?.length !== 0 
                        ? data?.map((post, index) => {
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
                                                                        ? <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/${post.User.image}`} width={16} height={16} alt='' priority />
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
                                    <button type="button" className="btn-like">
                                        <IoIosHeartEmpty size={18} color="#e2757a" />
                                        <span className="like-number">{post.Hearts.length}</span>
                                    </button>
                                </div>
                            )
                        }) 
                        : <p className='txt-noSearch'>
                            <strong className='txt-word'>"{searchParams.q}"</strong>
                            에 관련된 검색결과가 없습니다.
                            <Link href="/" type="button" className='btn-link'>다시 불러오기</Link>
                        </p>
                }
            </div>
        </div>
    )
}

export default SearchResultPosts