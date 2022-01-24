import { Year } from '../entities/years.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Year)
export class yearRepository extends Repository<Year> {}
