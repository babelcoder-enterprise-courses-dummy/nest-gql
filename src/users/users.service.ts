import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { Address } from './models/address.model';
import { range, sample } from 'lodash';
import { Role } from './models/role.model';
import { UserLevel } from './models/user-level.model';

@Injectable()
export class UsersService {
  users: User[] = [];
  addresses: Address[] = [];

  constructor() {
    for (let i = 1; i <= 100; i++) {
      const model = {
        id: i,
        name: `Name #${i}`,
        email: `name_${i}@myemail.com`,
        role: sample([Role.ADMIN, Role.MODERATOR, Role.MEMBER]),
      };
      let user: User;

      switch (model.role) {
        case Role.ADMIN:
          user = { ...model, level: sample(range(1, 10)) } as User;
          break;
        case Role.MODERATOR:
          user = {
            ...model,
            section: sample(['article', 'product', 'order']),
          } as User;
          break;
        case Role.MEMBER:
          user = {
            ...model,
            membership: sample([
              UserLevel.CLASSIC,
              UserLevel.GOLD,
              UserLevel.SILVER,
              UserLevel.PLATINUM,
            ]),
          } as User;
      }

      this.users.push(user);

      this.addresses.push({
        id: i,
        houseNumber: `House #${i}`,
        userId: i,
      });
    }
  }

  findAll() {
    return this.users;
  }

  findById(id: number) {
    return this.users.find((u) => u.id === id);
  }

  findAddressByUserId(userId: number) {
    return this.addresses.find((a) => a.userId === userId);
  }
}
