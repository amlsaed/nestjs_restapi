import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/enums/category'


@Schema({
    timestamps:true
})
export class Book{

  @Prop()
  @IsNotEmpty()
  @IsString()
  readonly title: string;


  @Prop()
  @IsNotEmpty()
  @IsString()
  readonly description: string;


  @Prop()
  @IsNotEmpty()
  @IsString()
  readonly author: string;


  @Prop()
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;


  @Prop()
  @IsNotEmpty()
  @IsEnum(Category ,{message:"please enter a valid category"})
  readonly category: Category;
}


export const BookSchema = SchemaFactory.createForClass(Book)