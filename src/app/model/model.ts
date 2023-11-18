export type Board = {
    id: string;
    user_id: string;
    title: string;
    description: string;
    reward: string;
    endDate: string;
    level: string;
    max: number;
    finished: boolean;
    imageURL: string;
    createdAt: string;
    updatedAt: string;
};

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    rank: string;
    total_achievements: number;
    profileImageURL: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: string;
    user_id: string;
    post_id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
