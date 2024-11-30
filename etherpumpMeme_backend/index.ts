import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import TokenRouter from "./src/routes/tokens"
import CurveRouter from "./src/routes/curve"
import UploadRouter from "./src/routes/uploadMedia"
import dotenv from "dotenv";
// import { publicClient } from "./evm";
// import { moonUpFactoryContract } from "./contracts/meme_abi";
// import { parseAbiItem } from "viem";

dotenv.config();

const PORT = process.env.PORT || 9000;


const app = express();

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded());

app.use("/", TokenRouter);
app.use("/curves/", CurveRouter)
app.use("/", UploadRouter)


app.get("/", async (req, res) => {
    res.send("Hello World");
})

app.use((err: Error, req:Request, res: Response, next: NextFunction) => {
    if (!res.headersSent) {
        res.status(500).send({ message: err.message });
    }
});


async function main(){
    console.log("Attemting Boot");
    if(!process.env.MONGODB_URI) throw new Error("Connection URI missing");

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connection established");

    // await listenToContractEvents();
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    });
}

// Start listening to contract events
// async function listenToContractEvents() {
//   const fromBlockx = 1234567; // Contract deployment block
//   const toBlockx = await publicClient.getBlockNumber(); // Current block number

//   const batchSize = 1000; // Process 1000 blocks at a time
//   let logs = [];
//   for (let i = fromBlockx; i <= toBlockx; i += batchSize) {

//     try {
//       const logs = await publicClient.getLogs({
//         address: moonUpFactoryContract.address,
//         event:     {
//           type: 'event',
//           name: 'MoonUpBeaconFactory__TokensCreated',
//           inputs: [
//               { indexed: true, name: 'proxy', type: 'address' },
//               { indexed: true, name: 'token', type: 'address' },
//           ],
//       },
//         fromBlock: BigInt(i),
//         toBlock: BigInt(Math.min(i + batchSize - 1, Number(toBlockx))),
//       })
//       console.log(logs)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//     // try {
//     //   // Subscribe to the "MoonUpBeaconFactory__TokensCreated" event
//     //   const unwatch = publicClient.watchContractEvent({
//     //     ...moonUpFactoryContract,
//     //     eventName: "MoonUpBeaconFactory__TokensCreated",
//     //     onLogs: (logs) => {
//     //       console.log('New Event Detected:', logs);
//     //       // Add your processing logic here
//     //     },
//     //     onError: (error) => {
//     //       console.error('Error while listening to events:', error);
//     //     },
//     //   });
  
//     //   unwatch();
//     //   console.log('Listening to MoonUpBeaconFactory__TokensCreated events...');
//     // } catch (error) {
//     //   console.error('Error setting up event listener:', error);
//     // }
//   }
  


main();