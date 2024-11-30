import { Schema, model } from "mongoose";
import { IComment } from "../types/custom";


const messageSchema = new Schema<IComment>({
    sender: {type: String},
    message: {type: String},
})

export default model<IComment>("Comment", messageSchema);