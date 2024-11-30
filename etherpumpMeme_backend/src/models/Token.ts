import { Schema, model } from "mongoose";
import { IToken } from "../types/custom";


const tokenSchema = new Schema<IToken>({
    address: {type: String},
    curveAddr: {type: String},
    creator: {type: String},
    createdBlock: {type: String},
    name: {type: String},
    description: {type: String},
    totalSupply: {type: Number},
    image: {type: String},
    symbol: {type: String},
    website: {type: String},
    telegram: {type: String},
    twitter: {type: String},
    replies: {type: [String]},
})

export default model<IToken>("Token", tokenSchema)