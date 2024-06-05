import { AppDataSource } from "../config/data-source"
import { ICredentialDto } from "../dtos/credentialDto"
import { UserDto } from "../dtos/usersDto"
import { Credential } from "../entities/Credential"
import { User } from "../entities/Users"
import { ICredential } from "../interfaces/ICredentail"
import { createCredential } from "./credentialsServices"


let users: User[] = []
let userId = 1


export const getUsersServices = async (): Promise<User[]>  => {
    
    const users: User[] = await AppDataSource.getRepository(User).find({
        relations: {
            credential: true,
            appointments:true
        }
    })
    return users;
}

export const loginUserServices = async (user: ICredentialDto): Promise<Credential | null> => {
    const userLog: Credential | null = await AppDataSource.getRepository(Credential).findOneBy({
        username: user.username,
        password: user.password
    });
    if (userLog === null) {
        throw Error("No se encontro el usuario")
    }else return userLog;
}

export const credentialId = async (id: number) => {
    const user: User | null =await AppDataSource.getRepository(User).findOneBy({credential:{id}})
    return user
}

export const getUsersIdServices = async (id: number) => {
    const getUId: User | null = await AppDataSource.getRepository(User).findOne({
        where: { id },
        relations: ["appointments"]
    });
    if(!getUId) throw Error('No se encontro un usuario con ese ID');


    return getUId;
}

export const createUser = async (user: UserDto) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect()

    try{
    await queryRunner.startTransaction()
    const {username, password,name,email,birthdate,nDni} = user;

    const cred = await createCredential({username, password});
    const newUser = await AppDataSource.getRepository(User).create({name,email,birthdate,nDni});
    await queryRunner.manager.save(newUser)
    
    const ncred = await AppDataSource.getRepository(Credential).findOneBy({
        id: cred
    })

    if (ncred == null) {
        throw Error("error")
    }else{newUser.credential = ncred;
        AppDataSource.getRepository(User).save(newUser)}

    await queryRunner.commitTransaction();

    return newUser
    }catch(error){

        await queryRunner.rollbackTransaction();
        throw Error("Error al crear usuario")

    }finally{
        await queryRunner.release();
    }
}