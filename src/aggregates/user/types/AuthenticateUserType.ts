type AuthenticateUserRequest = {
    password: string;
    email: string;
};

type AuthenticateUserResponse = {
    token: string;
};

export { AuthenticateUserRequest, AuthenticateUserResponse };
