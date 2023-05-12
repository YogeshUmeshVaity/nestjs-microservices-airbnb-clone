import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';

/**
 * The reason why we are abstracting our own ConfigModule when wrapping around NestConfigModule
 * is if we change the underlying configuration (NestConfigModule), the changes will be in one
 * place. It's a good idea to abstract third party dependencies when we can.
 *
 * By calling the forRoot(), we are telling the NestConfigModule to load the ENVs that we have
 * in memory and in .env files.
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
