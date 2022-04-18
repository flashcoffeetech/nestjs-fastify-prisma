import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

import { Todos, Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TodosCreateInput): Promise<Todos> {
    return this.prisma.todos.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodosWhereUniqueInput;
    where?: Prisma.TodosWhereInput;
    orderBy?: Prisma.TodosOrderByWithRelationInput;
  }): Promise<Todos[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.todos.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: number): Promise<Todos | null> {
    return this.prisma.todos.findUnique({
      where: { id },
    });
  }

  async update(params: {
    id: number;
    data: Prisma.TodosUpdateInput;
  }): Promise<Todos> {
    const { id, data } = params;
    return this.prisma.todos.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<Todos> {
    return this.prisma.todos.delete({
      where: { id },
    });
  }
}
