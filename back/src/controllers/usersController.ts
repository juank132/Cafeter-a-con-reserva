import { Request, Response } from "express"
import { createUser, credentialId, getUsersIdServices, getUsersServices, loginUserServices } from "../services/usersService"
import { User } from "../entities/Users"
import { UserDto } from "../dtos/usersDto"
import { Credential } from "../entities/Credential"
import { AppDataSource } from "../config/data-source"


export const registerUsers = async (req: Request, res: Response) => {
    try {
        const user : UserDto = req.body
        const newUser: User = await createUser(user)
        res.status(201).json(newUser)

    } catch (error) {
        res.status(400).json({
            error: "Los datos son incorrectos"
        })
    }
}

export const loginUsers = async (req: Request, res: Response) => {
    
    try {
        const {username, password} = req.body
        const userLog = await loginUserServices({username, password});

        if (!userLog) {
            throw Error("no se encontro el usuario")
        };

        const user: User | null = await credentialId(userLog.id);

        res.status(202).json({login:true,user})

    } catch (error) {
        res.status(400).json({
            error: "Los datos son incorrectos"
        })
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsersServices()
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
}

export const getUsersId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user: User = await getUsersIdServices( Number(id) )
        res.status(200).json(user)

    } catch (error) {
        res.status(404).json({
            error: "El usuario no fue encontrado"
        })
    }
}