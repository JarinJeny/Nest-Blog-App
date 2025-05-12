import { Module } from '@nestjs/common';
import { QouteController } from './qoute.controller';
import { QouteService } from './qoute.service';

@Module({
  controllers: [QouteController],
  providers: [QouteService]
})
export class QouteModule {}
