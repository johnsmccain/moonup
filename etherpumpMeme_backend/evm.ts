import { parseAbi, parseAbiItem } from 'viem';
// import { client } from '.';
// import { MoonUpFactory } from './../smartcontract/artifacts/contracts/MoonUpFactory.sol/MoonUpFactory.d';
import  crypto  from 'crypto';

import {sepolia, mainnet} from "viem/chains";
import { createPublicClient, createWalletClient, getContract, http, publicActions } from 'viem';
import { moonUpFactoryContract, moonUpTokenABI } from './contracts/meme_abi';


const pvtKey = crypto.randomBytes(32).toString("hex");



export const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
});

export const client = createWalletClient({
    chain: sepolia,
    transport: http(),
    key: pvtKey,
}).extend(publicActions);


const moonUpFactory = getContract({
    ...moonUpFactoryContract,
    client: {
        public: publicClient, 
    },
});


const contract = getContract({
    ...moonUpFactoryContract,
    client: {
        public: publicClient,
    },
})


// console.log(unwatch())
async function name() { 
    const eventname = await publicClient.getContractEvents({
        ...moonUpFactoryContract,
        eventName: "MoonUpBeaconFactory__TokensCreated",
    });
    console.log(`moonUpFactory: ${eventname}`); 
}
name()
async function getBlockNumber() {
    return await client.getBlockNumber();
}

const ONE_ETH = BigInt(Math.pow(10, 18));

export const evms = {client, publicClient}

export default {client, moonUpFactory, getBlockNumber, ONE_ETH};