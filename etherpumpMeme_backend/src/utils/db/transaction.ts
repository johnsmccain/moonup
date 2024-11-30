import { moonUpMarketContract } from "../../../contracts/meme_abi";
import evm from "../../../evm";

import Transaction, {TransactionConfig} from "../../models/Transaction";

export async function refreshTracactions(address: `0x${string}`) {
    try {
        const config = await TransactionConfig.findOne({});
        if (!config) throw "No config found";

        const buys = await evm.client.getContractEvents({
            abi:moonUpMarketContract.abi,
            address,
            eventName: "Buy",
            fromBlock: config.tokensLastBlock,
            toBlock: "latest"
        });

        const sells = await evm.client.getContractEvents({
            abi:moonUpMarketContract.abi,
            address,
            eventName: "Sell",
            fromBlock: config.tokensLastBlock,
            toBlock: "latest"
        });

        buys.forEach(async (item) => {
            const {buyer, ethAmount, tokenAmount} = item.args;


            const buy = await Transaction.create({
                address: buyer,
                ethAmount: ethAmount,
                tokenAmount: tokenAmount,
                type: "buy",   
            })
        })

        sells.forEach(async (item) => {
            const {seller, ethAmount, tokenAmount} = item.args;
            const buy = await Transaction.create({
                address: seller,
                ethAmount: ethAmount,
                tokenAmount: tokenAmount,
                type: "buy",   
            })
        })
    } catch (error) {
        console.log(error);
    }
}