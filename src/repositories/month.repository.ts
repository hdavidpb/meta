import { Month } from "../entities/months.entity";
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Month)
export class monthRepository extends Repository<Month> {}
