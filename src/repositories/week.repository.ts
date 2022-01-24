
import { Repository, EntityRepository } from 'typeorm';
import { Week } from "src/entities/weeks.entity";

@EntityRepository(Week)
export class weekRepository extends Repository<Week> {}
