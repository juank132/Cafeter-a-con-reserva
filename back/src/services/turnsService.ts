import { AppDataSource } from "../config/data-source";
import { ICredentialDto } from "../dtos/credentialDto";
import { AppointmentDto } from "../dtos/turnDto";
import { UserDto } from "../dtos/usersDto";
import { Appointment } from "../entities/Turb";
import { User } from "../entities/Users";
import { createUser } from "./usersService";

let arrTurns: Appointment[] = [];

let TId:number = 1; 

export const getTurnsService = async (): Promise<Appointment[]> => {
    const turns: Appointment[] = await AppDataSource.getRepository(Appointment).find({
        relations: {
            user: true
        }
    })
    return turns
};

export const idTurn = async (id: number) => {
    const getTId: Appointment | null = await AppDataSource.getRepository(Appointment).findOneBy({id})
    if (!getTId) throw Error('No se encontro un turno con ese ID');
    return getTId;
};

export const createTurnService = async (turn: AppointmentDto) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect()
    
    try{
        await queryRunner.startTransaction()
    const newTurn: Appointment = await AppDataSource.getRepository(Appointment).create(turn)
    newTurn.status = 'Active'
        await queryRunner.manager.save(newTurn)


    const user = await AppDataSource.getRepository(User).findOneBy({
        id: turn.userid
    });

    if (user == null) {
        throw Error("Usuario no existe")
       }else{ newTurn.user = user;
        AppDataSource.getRepository(Appointment).save(newTurn);}

        await queryRunner.commitTransaction();

    return newTurn

    }catch(error){
        await queryRunner.rollbackTransaction()
        throw Error("Error al crear el Turno")
    }finally{
        await queryRunner.release()
    } 
};

export const cancelTurn = async (id: number) => {
    const getTId: Appointment | null = await AppDataSource.getRepository(Appointment).findOneBy({id})
    if (getTId){
            getTId.status = "Cancelled";
            await AppDataSource.getRepository(Appointment).save(getTId);
        }else{
            throw Error("El turno no existe");
        };
        return getTId.status
};
