// import axios from "axios";
import { PinataSDK } from "pinata";

const pinataAPIGateway = import.meta.env.VITE_PINATA_API_GATEWAY;
const pinataAPIGatewayKey =  import.meta.env.VITE_PINATA_API_GATEWAY_KEY;
const pinataAPIJWT =  import.meta.env.VITE_PINATA_API_JWT
export const pinata = new PinataSDK({
  pinataJwt: pinataAPIJWT,
  pinataGateway: pinataAPIGateway,
  pinataGatewayKey: pinataAPIGatewayKey
});

// console.log(import.meta.env.VITE_PINATA_API_JWT, import.meta.env.VITE_PINATA_API_GATEWAY );

// export async function UpLoadToPinata(file:any) {
//   try {
//     const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
//     const upload = await pinata.upload.file(file);

//     return upload;
//   } catch (error) {
//     console.log(error);
//   }
// }
// Upload a file (e.g., image) to Pinata

export async function uploadToPinata(file: File) {
    try {
      const upload = await pinata.upload.file(file);
      console.log("File uploaded:", upload);
      return upload; // Contains the CID of the uploaded file
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }


export async function retrieveFromPinata(cid:string) {
  try {
    const data = await pinata.gateways.get(cid);
    console.log(data)

    const url = await pinata.gateways.createSignedURL({
       	cid,
    	expires: 1800,
    })
   return url;

  } catch (error) {
    console.log(error);
  }
}


// Upload JSON metadata to Pinata
export async function uploadJsonToPinata(json: any) {
  try {
    const upload = await pinata.upload.json(json);
    console.log("JSON uploaded:", upload);
    return upload;
  } catch (error) {
    console.error("Error uploading JSON:", error);
    throw error;
  }
}

// export async function uploadCIDToURL(cid: any) {
//   try {
//     const upload = await pinata.;
//     console.log("JSON uploaded:", upload);
//     return upload;
//   } catch (error) {
//     console.error("Error uploading JSON:", error);
//     throw error;
//   }
// // }
// export async function fetchFromCIDToURL(cid: string) {
//   try {
//     // if (cid.length < 10) return {}
//     // const pinataUrl1 = `https://${pinataAPIGateway}/ipfs/QmfYxM6uPt5Pcj1LBhHPCST3ADhUhbUp5zFRx3Dqj6jjBD?pinataGatewayToken=${pinataAPIGatewayKey}`
//     const pinataUrl = `https://jade-just-rhinoceros-52.mypinata.cloud/ipfs/bafkreiefwpwtsdywez5hpvycsvmfirzp3ozj3y5ei5xfvgi3m7xpno2qvi?pinataGatewayToken=5TuK9dUUldP4JaFc50HG3CfjZ3ZonvwsP8PkAKrcokIJvJwpBuGvRPcSb3u6Nlsi`
//     // console.log(`${pinataAPIGateway}: ${cid}: ${pinataAPIGatewayKey}`)
//      const data = await axios.get(pinataUrl)
//     // const data = await pinata.gateways.get(`${cid}?pinataGatewayToken=${pinataAPIGatewayKey}`);
//     console.log(data)
//     // console.log(`https://jade-just-rhinoceros-52.mypinata.cloud/ipfs/${cid}?pinataGatewayToken=${pinataAPIGatewayKey}`)
//     console.log(pinataUrl)
//     // const url = await pinata.gateways.createSignedURL({
//     //   cid,
//     // 	expires: 1800,
//     // })
//     return data;

//   } catch (error) {
//     console.log(error);
//   }
// }