import { Request, Response } from "express"
import { Appointment } from "../entities/Turb"
import { cancelTurn, createTurnService, getTurnsService, idTurn } from "../services/turnsService"
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/Users";

export const createTurn = async (req: Request, res: Response) => {
    try {
        const {date,time,userid} = req.body;

        const newTurn: Appointment = await createTurnService({date,time,userid})

        const user = await AppDataSource.getRepository(User).findOneBy({
            id: userid
        });

        res.status(202).json(newTurn)

    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
}

export const getTurns = async (req: Request, res: Response) => {
    try {

        const turns: Appointment[] = await getTurnsService();

        res.status(202).json(turns)

    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
}

export const getTurnData = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const turnData = await idTurn(Number(id));

        res.status(202).json(turnData)

    } catch (error) {
        res.status(400).json({
            error: "El turno no fue encontrado"
        })
    }
}

export const statusTurn = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const turn = await cancelTurn(Number(id));
        res.status(202).json(`El status del turno es: ${turn}`)

    } catch (error: any) {
        res.status(500).json({ error: error.message });
        
    }
}