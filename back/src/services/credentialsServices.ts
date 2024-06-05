import { AppDataSource } from "../config/data-source";
import { ICredentialDto } from "../dtos/credentialDto";
import { Credential } from "../entities/Credential";
import { ICredential } from "../interfaces/ICredentail";

const credentials: ICredential[] = [];
let credentialid: number = 1; 

export const createCredential = async (dtos: ICredentialDto): Promise<number> => {

    const existingCredential = await AppDataSource.getRepository(Credential).findOne({ where: { username: dtos.username } });
    
    if (existingCredential) {
        throw Error("El usuario ya tiene una credencial asociada");
    }else{const newCredential = await AppDataSource.getRepository(Credential).create(dtos)
        const save =  await AppDataSource.getRepository(Credential).save(newCredential)
    
        return newCredential.id;}

    
};

export const checkDisp = (user: string ,password: string): number => {
    let obje = {user,password}
    const filC = credentials.filter((obj) => obj.username === obje.user && obj.password === obje.password)
    return filC[0].id
}


