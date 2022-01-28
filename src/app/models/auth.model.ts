export class JWT {
    token: string = "";

    getPayLoad(): AuthUser | null {
        try {
            return JSON.parse(atob(this.token.split(".")[1]));
        } catch (e) {
            return null;
        }
    }
}

export class AuthUser {
    name: string = "";
    email: string = "";
    admin: boolean = false;
    exp: number = 0;
}