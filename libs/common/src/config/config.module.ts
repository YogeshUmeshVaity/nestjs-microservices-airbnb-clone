import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

/**
 * The reason why we are abstracting our own ConfigModule when wrapping around NestConfigModule
 * is if we change the underlying configuration (NestConfigModule), the changes will be in one
 * place. It's a good idea to abstract third party dependencies when we can.
 *
 * By calling the forRoot(), we are telling the NestConfigModule to load the ENVs that we have
 * in memory and in .env files.
 */
@Module({ imports: [NestConfigModule.forRoot()] })
export class ConfigModule {}
