import { Schema, model } from "mongoose";
import { IConfig, ITransaction } from "../types/custom";


const transactionSchema = new Schema<ITransaction>({
    address: {type: String},
    createdBlock: {type: String},
    ethAmount:{type: Number},
    tokenAmount: {type: Number},
    type: {type: String},
})

const transactionConfigSchema = new Schema<IConfig>({
    tokensLastBlock: {type: BigInt, default: 0n},
    startBlock: {type: BigInt, default: 0n},
});

export const TransactionConfig = model<IConfig>("TransactionConfig", transactionConfigSchema);

export default model<ITransaction>("Transaction", transactionSchema)