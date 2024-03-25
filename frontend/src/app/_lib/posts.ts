import {QueryFunction} from "@tanstack/query-core";
import {PostProps} from '@/app/models/post';
import axios from "axios";

type AddPost = {
    user: any;
    imageFile: File 
    title: string
    content: string
}

export const getPosts = async ({pageParam}: {pageParam: number}) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${pageParam}`, {
            next: {
                tags: ['posts']
            },
            cache: 'no-store'
        })
    
        if (!res.ok){
            throw new Error('Failed to fetch data')
        }
        
        return res.json();
        
    } catch (e) {
        console.error(e)
    }
}

export const getAsidePosts = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/aside/list`, {
            next: {
                tags: ['aside'],
            },
            cache: 'no-store',
            credentials: 'include'
        })
    
        if (!res.ok){
            throw new Error('Failed to fetch data')
        }
        
        
        return res.json();
        
    } catch (e) {
        console.error(e)
    }
}

export const getSearchPosts: QueryFunction<PostProps[], [_1: string, searchParams: { q: string, pf?: string, f?: string }]> = async ({ queryKey }) => {
    const [_1, searchParams] = queryKey;
    const urlSearchParams = new URLSearchParams(searchParams as any);
    
    try {
        console.log(urlSearchParams.toString())
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/search/result?${urlSearchParams.toString()}`, {
            next: {
                tags: ['posts', searchParams.q],
            },
            credentials: 'include',
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        
        return await res.json();
        
    } catch (e) {
        console.error(e);
        throw e; // Ensure you rethrow errors for react-query to handle them.
    }
};

export const getSinglePost: QueryFunction<PostProps, [_1: string, _2: string]> = async ({ queryKey }) => {
    const [_1, id] = queryKey;
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/content/${id}`, {
            next: {
                tags: ['posts', id],
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        
        return await res.json();

    } catch (e) {
        console.error(e);
        throw e; // Ensure you rethrow errors for react-query to handle them.
    }
}
