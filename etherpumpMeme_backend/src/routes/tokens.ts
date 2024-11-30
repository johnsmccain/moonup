import express from "express";
import Token from "../models/Token";
import { isAddress, recoverMessageAddress } from "viem";
import { IToken } from "../types/custom";


const router = express.Router();

router.get("curves/", async (req, res) => {
    try {
        // await refreshTokens(req.body.);

        const page = (typeof req.query.page == "string" && parseInt(req.query.page)) || 1;
        const limit = (typeof req.query.limit == "string" && parseInt(req.query.limit)) || 10;
        const query = req.query.q as string;

        const startIndex = (page - 1) * limit;

        const response = {
            total: 0,
            tokens: []
        }
        let tokenQuery = {};

        if(query){
            tokenQuery = {
                $or: [
                    {name: new RegExp(query, "i")},
                    {symbol: new RegExp(query, "i")},
                    {description: new RegExp(query, "i")}
                ]
            }
        }

        const total = await  Token.countDocuments(tokenQuery);

        response.tokens = await Token.find(
            tokenQuery,
            {replies: false},
            {limit: limit, skip: startIndex, sort: {createdBlock: -1}
            }
        );

        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error});
    }
})



export default router;