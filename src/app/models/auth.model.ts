export class JWT {
    token: string = "";
}

export class AuthUser {
    name: string = "";
    email: string = "";
    admin: boolean = false;
    exp: number = 0;
}