import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Month } from './months.entity';


@Entity()
export class  Week {

    @PrimaryGeneratedColumn("uuid")
    id:string
    @Column()
    weekName:string
    
    @Column({default:0})
    quotePrice:number

    @Column({default:false})
    isCancel:boolean

    @JoinColumn({name:"monthId"})
    @ManyToOne((type)=>Month,month=>month.weeks)
    month:Month


}