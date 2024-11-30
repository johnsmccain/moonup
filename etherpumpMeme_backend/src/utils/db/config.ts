import evm from "../../../evm";
import Config from "../../models/Config";

export async function ensureConfig() {
    const configExists = await Config.countDocuments();
    if (configExists == 0){
        console.log("Creating new config");
        const newConfig = await Config.create({
            tokensLastBlock: 
                ((await evm.getBlockNumber()) * BigInt(97))/ BigInt(100),
                startBlock: ((await evm.getBlockNumber()) * BigInt(97))/BigInt(100),
        })
        await newConfig.save();
    }
}