import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./Credential";
import { Appointment } from "./Turb";

@Entity({
    name: "users"
})
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    birthdate: Date;
    
    @Column()
    nDni: number;
    
    
    @OneToOne(() => Credential)
    @JoinColumn()
    credential: Credential
    
    @OneToMany(() => Appointment, (appointments => appointments.user))
    appointments: Appointment[]
    
}