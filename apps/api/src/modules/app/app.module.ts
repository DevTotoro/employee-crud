import { Module } from '@nestjs/common';

import { AppController } from '~/modules/app/app.controller';

@Module({
  controllers: [AppController]
})
export class AppModule {}
