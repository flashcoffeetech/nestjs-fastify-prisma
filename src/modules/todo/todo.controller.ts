import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TodoService } from './todo.service';
import { TodoRequest } from './dto/requests/TodoRequest.dto';

@ApiTags('Todos')
@Controller({
  version: ['1'],
})
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('todo')
  create(@Body() createTodoDto: TodoRequest) {
    return this.todoService.create(createTodoDto);
  }

  // @Version('1')
  @Get('todo')
  findAll() {
    const params = {};
    return this.todoService.findAll(params);
  }

  // @Version('1')
  @Get('todo/:id')
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(+id);
  }

  @Patch('todo/:id')
  update(@Param('id') id: number, @Body() data: TodoRequest) {
    const params = {
      id: +id,
      data,
    };
    return this.todoService.update(params);
  }

  @Delete('todo/:id')
  remove(@Param('id') id: number) {
    return this.todoService.remove(+id);
  }
}
