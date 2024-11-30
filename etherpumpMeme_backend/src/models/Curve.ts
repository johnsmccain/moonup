import { ICurve } from "../types/custom";
import { IConfig } from "../types/custom";
import {Schema, model} from "mongoose";


const curveSchema = new Schema<ICurve>({
    address: {type: String},
    tokenAddr: {type: String},
    comments: [
        {type: Schema.Types.ObjectId, ref: "Comment"}
    ],
    holders: [
        {type: Schema.Types.ObjectId, ref: "Holder"}
    ],
    transactions:[
        {type: Schema.Types.ObjectId, ref: "Transaction"}
    ]
})

const curveConfigSchema = new Schema<IConfig>({
    tokensLastBlock: {type: BigInt, default: 0n},
    startBlock: {type: BigInt, default: 0n},
});

export default model<ICurve>("Curve", curveSchema);
export const CurveConfig = model<IConfig>("CurveConfig", curveConfigSchema);