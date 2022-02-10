/**
 * Jeton récupéré dans la deuxième partie (Payload)
 * Exemple "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRm9vIiwiZW1haWwiOiJmb29AZXhhbXBsZS5jb20iLCJhZG1pbiI6dHJ1ZSwiZXhwIjoxNjA1MTg2MTg4fQ.LA_Y-NthD0gP4S4H34-JviakZ5b2kUx76cxCi2iSumE"
 * "name": "Foo",
 * "email": "foo@example.com",
 * "admin": true,
 * "exp": 1605186188
 */
export class JWT {
    token: string = "";

    getAuthUser(): AuthUser | null {
        try {
            return JSON.parse(atob(this.token.split(".")[1]));
        } catch (e) {
            return null;
        }
    }
}

/**
 * Utilisateur identifié
 */
export class AuthUser {
    name: string = "";
    email: string = "";
    admin: boolean = false;
    exp: number = 0;
}