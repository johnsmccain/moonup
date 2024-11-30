import { sepolia } from 'viem/chains';
import { createPublicClient, getContract, http } from 'viem';
import { moonUpFactoryContract, moonUpMarketContract } from "../../../contracts/meme_abi";
import evm, { publicClient } from "../../../evm";
import Curve, {CurveConfig} from '../../models/Curve';


export async function refreshCurve() {
    try {
        const config = await CurveConfig.findOne({});
        if (!config) throw "No config found";

        const eventname = await publicClient.getContractEvents({
            ...moonUpFactoryContract,
            eventName: "MoonUpBeaconFactory__TokensCreated",
        });
        console.log(`moonUpFactory: ${eventname}`);
        
   
        const moonUpFactoryEvents = await evm.client.getContractEvents({
            ...moonUpFactoryContract,
            eventName: "MoonUpBeaconFactory__TokensCreated",
            fromBlock: config.tokensLastBlock,
            toBlock: "latest"
        });

       
        console.log(moonUpFactoryContract)
        console.log(config.tokensLastBlock)


        moonUpFactoryEvents.forEach(async (item) => {
            const {MoonUpTokenPair, MoonUpErc20} = item.args;


            const curve = await Curve.create({
                address: MoonUpTokenPair,
                tokenAddr: MoonUpErc20,
            })

            curve.save();
        })

        // sells.forEach(async (item) => {
        //     const {seller, ethAmount, tokenAmount} = item.args;
        //     const buy = await Transaction.create({
        //         address: seller,
        //         ethAmount: ethAmount,
        //         tokenAmount: tokenAmount,
        //         type: "buy",   
        //     })
        // })
    } catch (error) {
        console.log(error);
    }
}