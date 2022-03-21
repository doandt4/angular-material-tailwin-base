export interface UserStatus {
    createdAt?: string;
    id?: string;
    messages?: string[];
    status_name?: string;
    updatedAt?: string;
    userId?: string;
}


export interface CurrentStatus{
    userId: string;
    messageId: string
}