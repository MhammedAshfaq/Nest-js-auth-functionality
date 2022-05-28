import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EdituserDto } from './dtos';
import { User } from './entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // GET_uSERS
  async getManyUsers() {
    return this.userRepository.find();
  }
  // GET_uSER
  async getUser(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User not exist');
    return user;
  }
  // CREATE_USER
  async createUser(dto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({ email: dto.email });
    if (userExist)
      throw new BadRequestException('User already registered with email');

    const newUser = this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }
  // EDIT_USER
  async editUser(id: number, dto: EdituserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User dose not exist');

    const editUser = Object.assign(user, dto);
    const show = await this.userRepository.save(editUser);

    delete show.password;
    return show;
  }
  // DELETE_USER
  async deleteUser(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User dose not exist');

    return this.userRepository.remove(user);
  }

  //FIND_BY_EMAIL
  async findByEmail(email:string){
    // return this.userRepository.findOne({email})
    return await this.userRepository
    .createQueryBuilder('user')
    .where({email})
    .addSelect('user.password')
    .getOne()
  }

}
