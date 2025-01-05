import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './jwt/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/constants';
import { ModelModule } from './modelList/user.module';
import { ProjectModule } from './projectList/user.module';

@Module({
  imports: [
    UserModule,
    ModelModule,
    ProjectModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '43200s' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'db',
      //entities: [__dirname + '**/*.entities{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true, //自动加载实体
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
