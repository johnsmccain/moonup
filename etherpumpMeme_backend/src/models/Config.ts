import { Schema, model} from "mongoose";
import { IConfig } from "../types/custom";

const tokensConfigSchema = new Schema<IConfig>({
    tokensLastBlock: {type: BigInt, default: 0n},
    startBlock: {type: BigInt, default: 0n},
});

export default model<IConfig>("Config", tokensConfigSchema);