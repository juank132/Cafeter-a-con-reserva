import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";

@Entity({
    name:"appointments"
})
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    time: Date;

    @Column()
    status: 'Active' | 'Cancelled';

    @ManyToOne(()=>User,(user)=> user.appointments)
    user: User;
}