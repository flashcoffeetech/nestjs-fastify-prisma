import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TodoResponse {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  content?: string;

  @ApiProperty()
  @Expose()
  active?: boolean;
}
