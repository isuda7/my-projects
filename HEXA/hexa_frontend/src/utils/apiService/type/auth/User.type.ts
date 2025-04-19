export type signup = {
    email: string;
    lastName: string;
    firstName: string;
    role: string;
    password?: string | undefined;
    rePassword?: string | undefined;
}
export type UserReponse = {
    id: number;
    email: string;
    name: string;
    role: string;

}