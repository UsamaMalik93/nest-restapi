import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from './book.enum';
import { User } from 'src/auth/auth.model';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true, default: '', type: String })
  title: string;

  @Prop({ required: false, default: null, type: String })
  description: string;

  @Prop({ required: true, default: null, type: String })
  author: string;

  @Prop({ required: true, default: 0, type: Number })
  price: number;

  @Prop({ required: false, default: '', enum: Object.values(Category) })
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
