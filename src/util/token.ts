import jsonwebtoken from 'jsonwebtoken';

class Token {
    public generateTokenForCreatedUser = (email:string, id:string) => {
        //@ts-ignore
        return jsonwebtoken.sign({id, email}, process.env.tokenKey, { algorithm: 'HS256', expiresIn:'7d' }) //expires in 7days
    }

    public verifyToken = (token:string) => {
        //@ts-ignore
        return jsonwebtoken.verify(token, process.env.tokenKey, { algorithm: 'HS256', expiresIn:'7d' })
    }

    public decodeToken = (token:string) => {
        //@ts-ignore
        return jsonwebtoken.decode(token, process.env.tokenKey, {algorithm: 'HS256'})
    }
}


export default Token;