import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoInput } from './dto/create-todo-input';
import { Todo } from './entities/todo.entities';
import { UpdateTodoInput } from './dto/update-todo-input';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(createTodoInput: CreateTodoInput): Promise<Todo> {
    const newTodo = this.todoRepository.create(createTodoInput);
    return this.todoRepository.save(newTodo);
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateTodoInput: UpdateTodoInput): Promise<Todo> {
    const todo = await this.todoRepository.findOneOrFail({ where: { id } });
    Object.assign(todo, updateTodoInput);
    return this.todoRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
