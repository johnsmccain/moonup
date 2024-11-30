import express from "express";
import Token from "../models/Token";
import { v2 as cloudinary } from 'cloudinary'
import { isAddress, recoverMessageAddress } from "viem";
import { refreshTracactions } from "../utils/db/transaction";
import { refreshCurve } from "../utils/db/curve";
import { IToken } from "../types/custom";
import { Router, Request, Response } from "express";


const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // await refreshCurve();

        const page = (typeof req.query.page == "string" && parseInt(req.query.page)) || 1;
        const limit = (typeof req.query.limit == "string" && parseInt(req.query.limit)) || 10;
        const query = req.query.q as string;

        const startIndex = (page - 1) * limit;

        const response = {
            total: 0,
            curves: []
        }
        let curvesQuery = {};

        if(query){
            curvesQuery = {
                $or: [
                    {name: new RegExp(query, "i")},
                    {symbol: new RegExp(query, "i")},
                    {description: new RegExp(query, "i")}
                ]
            }
        }

        const total = await  Token.countDocuments(curvesQuery);

        response.curves = await Token.find(
            curvesQuery,
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

router.get("/:curveAddr", async (req, res) => {
    try {
        // await refreshCurve();
        const total = await  Token.findOne({curveAddr: req.params.curveAddr as `0x${string}`});

        res.status(200).send(total);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error});
    }
})

router.post("/", async (req, res) => {
    try {

        const curveAddr = req.body.curveAddr as `0x${string}`;
        console.log(curveAddr);
        console.log(req.body);
        // cloudinary.uploader.upload('').then(result => {
        //     console.log(result);
        //   })
        // Check if the curve already exists in the database
        const existingCurve = await Token.findOne({ curveAddr: curveAddr });

        if (existingCurve) {
            res.status(400).send({ message: "Curve already exists" });
            return;
        }

        // If not, create the curve (replace this with your actual creation logic)
        const newCurve = new Token({
            curveAddr: curveAddr,
            ...req.body, // Include additional data for the curve if needed
        });

        await newCurve.save();

        res.status(200).send({ message: "Curve created successfully", curve: newCurve });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
})




export default router;