import { Schema, model } from "mongoose";
import { IConfig, IHolder } from "../types/custom";


const holderSchema = new Schema<IHolder>({
    address: {type: String},
    amount: {type: Number},
})
const holderConfigSchema = new Schema<IConfig>({
    tokensLastBlock: {type: BigInt, default: 0n},
    startBlock: {type: BigInt, default: 0n},
});

export const HolderConfig = model<IConfig>("HolderConfig", holderConfigSchema);

export default model<IHolder>("Comment", holderSchema);
