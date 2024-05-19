import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mongodb',
          url: configService.get('MONGODB_CONNECTION_STRING'),
          database: configService.get('MONGODB_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts}'],
          logging: true,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
