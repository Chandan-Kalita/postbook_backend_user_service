const bcrypt = require('bcrypt');
const saltRounds = 10;


export const hashPassword = (password: string) => {
    return new Promise<string>((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err: any, hash: string) {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
}


export const comparePassword = (password: string, hash: string) => {
    return new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(password, hash, function (err: any, result: boolean) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}