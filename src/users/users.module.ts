import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { jwtConstants } from './constant';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from './user.guard';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
