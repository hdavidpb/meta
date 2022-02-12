import { Profile } from 'src/entities';

export interface ITokenInterface {
  id: string;
  username: Profile;
  sub: string;
  email: string;
}
