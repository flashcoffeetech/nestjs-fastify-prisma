import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TodoService } from './todo.service';
import { TodoRequest } from './dto/requests/TodoRequest.dto';

@ApiTags('Todos')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: TodoRequest) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll() {
    const params = {};
    return this.todoService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: TodoRequest) {
    const params = {
      id: +id,
      data,
    };
    return this.todoService.update(params);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoService.remove(+id);
  }
}
