import { Body, Controller, Get, HttpCode, InternalServerErrorException, NotFoundException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, LoginDetailsDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Public } from './decorators/public.decorators';
import { PartialUserDetails } from './types/user.types';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  
  @HttpCode(201)
  @Public()
  @Post('signUp')
  async singnUp(@Body() createUser: CreateUserDto): Promise<any> {
    try {
      await this.usersService.signUp(createUser);
      return { message: "User Created Successfully" };
    } catch (error) {
      new InternalServerErrorException();
    }
  }
  
  @HttpCode(201)
  @Public()
  @Post('signIn')
  async singnIn(@Body() loginUser: LoginDetailsDto): Promise<any> {
    try {
      const token =  await this.usersService.signIn(loginUser);
      return token;
    } catch (error) {
      new InternalServerErrorException()
    }
  }
  
  @HttpCode(200)
  @Get('allUsers')
  async getUsers(): Promise<PartialUserDetails[]> {
    
      const users: PartialUserDetails[] =  await this.usersService.allUser();
      
      if (!users?.length) {
        new NotFoundException('User not found');
      }

      return users;
   
  }

}
