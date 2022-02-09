import { Profile } from 'src/entities';

export interface ITokenInterface {
  username: Profile;
  sub: string;
  email: string;
}
