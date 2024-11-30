import { Address } from './../../../speedRunEthereum/challenge-0-simple-nft/packages/nextjs/components/scaffold-eth/Address';
import { Address } from 'viem';
import "node";

export interface IToken {
    address: string;
    curveAddr: string;
    creator: string;
    createdBlock: string;
    name: string;
    symbol:string;
    totalSupply: Number;
    description: string;
    image: string;
    website: string;
    telegram: string;
    twitter: string;
    replies: string[];
}

export interface ICurve {
    address: string;
    tokenAddr: string;
    comments: [
        {type: any, ref: string}
    ];
    holders: [
        {type: any, ref: string}
    ];
    transactions:[
        {type: any, ref: string}
    ]
}
export interface IComment {
    sender: string;
    message: string;
}

export interface IHolder {
    address: string;
    amount: number;
}

export interface IConfig {
    tokensLastBlock: bigint;
    startBlock: bigint;
}

export interface ITransaction {
    curveAddr: string;
    address: string;
    ethAmount:Number;
    tokenAmount: Number;
    type: string;
    createdBlock: string
}