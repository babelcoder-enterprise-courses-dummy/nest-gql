import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { Address } from './models/address.model';

@Injectable()
export class UsersService {
  users: User[] = [];
  addresses: Address[] = [];

  constructor() {
    for (let i = 1; i <= 100; i++) {
      this.users.push({
        id: i,
        name: `Name #${i}`,
        email: `name_${i}@myemail.com`,
      });

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
