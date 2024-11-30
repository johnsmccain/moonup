import express from "express";
import tokenRout from "./tokens";
import transactionRoute from "./transactionHistory";
import curveRoute from "./curve";

const router = express.Router();

router.use("/tokens", tokenRout);
router.use("/transactions/", transactionRoute);
router.post("curves/", curveRoute);

router.get("/", (req, res) => {
    res.send(
        `Backend running successfully on ${
            req.protocol + "://" + req.get("host") + req.originalUrl
        }`
    )
})

export default router;