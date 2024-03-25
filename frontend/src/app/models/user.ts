interface UserID {
    id: string,
}

export interface User {
    userID: string,
    image: string,
    type: string,
}

// export interface User {
//     userID: string,
//     image: string,
//     Followers: UserID[],
//     _count: {
//         Followers: number,
//         Followings: number,
//     }
// }