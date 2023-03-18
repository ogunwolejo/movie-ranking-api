import UserModel from "../model/user.model";

const createAndAuthorizeUser = async(email:string, fullName:string) => {
    const newUser = await UserModel.create({
        fullName,
        email
    })

    return newUser;
}

export default createAndAuthorizeUser;