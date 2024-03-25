import { User } from "./user";
import {PostImage} from "./postImage";

interface UserID {
    userId: string,
}

export interface PostProps {
    postId: number;
    User: User;
    title: string;
    content: string;
    createdAt: Date;
    Images: PostImage[] | string,
    Hearts: UserID[],
    Comments: UserID[],
    _count: {
        Hearts: number,
        Reposts: number,
        Comments: number,
    }
}