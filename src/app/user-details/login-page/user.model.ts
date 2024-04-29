export class User {
    constructor(private userName: string, private _token: string, private expirationDate: Date) {

    }

    get token() {
        if (new Date() > this.expirationDate) {
            return null
        }
        return this._token

    }
}