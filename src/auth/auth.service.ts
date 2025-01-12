import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './auth.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const existingEmail = await this.userModel.findOne({ email });
    if (existingEmail)
      throw new BadRequestException('Email already registered!');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async logIn(logInDto: LogInDto): Promise<{ token: string }> {
    const { email, password } = logInDto;

    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('InValid Email or Password !');

    const isValidPassword = await bcrypt.compare(
      password,
      (await user).password,
    );

    if (!isValidPassword)
      throw new UnauthorizedException('InValid Email or Password!');

    const token = this.jwtService.sign({ id: (await user)._id });

    return { token };
  }
}
