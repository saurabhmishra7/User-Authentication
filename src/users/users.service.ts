import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { CreateUserDto, LoginDetailsDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { ConfigService } from '@nestjs/config';
import { PartialUserDetails } from './types/user.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signUp(user: CreateUserDto): Promise<User> {
    try {
      const { fullName, email, password } = user;
      const hash = await this.encryptPassword(password);
      const res = this.usersRepository.create({ fullName, email, password: hash });
      return await this.usersRepository.save(res);
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(loginDetails: LoginDetailsDto): Promise<any> {
    try {
      const { email, password } = loginDetails;
      const userDetail: User = await this.usersRepository.findOneBy({ email });
      const match = await bcrypt.compare(password, userDetail.password);
      if (match) {
        const accessToken: string = await this.jwtService.signAsync({ email, fullName: userDetail.fullName }, { privateKey: this.configService.get('PRIVATEKEY') });
        return {
          accessToken
        }
      }
    } catch (error) {
      
    }
  }

  async encryptPassword(password: string): Promise<any> {
    const hash= await bcrypt.hash(password, 10);
    return hash;
  }

 async allUser(): Promise<PartialUserDetails[]> {
   const allUsers: PartialUserDetails[] = await this.usersRepository.find({
    select: {
        fullName: true,
        email: true,
        id: true
    },
  });
   return allUsers;
 }
}


