import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,  // lets us query the database
    private jwtService: JwtService,
  ) {}

  // REGISTER: create a new user
  async register(name: string, email: string, password: string) {
    // Check if email already exists
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    // Encrypt the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    const user = this.userRepo.create({ name, email, password: hashedPassword });
    await this.userRepo.save(user);

    return { message: 'Registered successfully!' };
  }

  // LOGIN: check email + password
  async login(email: string, password: string) {
    // Find user by email
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare entered password with stored encrypted password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Create a token (proof that user is logged in)
    const token = this.jwtService.sign({ userId: user.id, name: user.name });

    return { token, name: user.name };
  }
}