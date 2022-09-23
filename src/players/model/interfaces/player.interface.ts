/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
import { Category } from "src/categories/model/interfaces/category.interface";


export interface Player extends Document {
    readonly email: string;
    readonly phoneNumber: string;
    name: string;
    category: Category
    ranking: string;
    rankingPosition: number;
    urlPlayerPhoto: string;
}