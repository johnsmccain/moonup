
import axios from "axios"
import { ITokenInfo } from "../types";

export async function fetchUrlToJson(url: string){
    return await axios.get(url)
}

const getBaseURL = () => {
    if (import.meta.env.VITE_NODE_ENV === "development") {
      return "http://localhost:9000"; // Development server
    } else if (import.meta.env.VITE_NODE_ENV === "production") {
      return "https://moonup-zhc5.onrender.com/"; // Production server
    }
    return "http://localhost:9000"; // Fallback
  };
  /**
   * Fetches data from the dynamic API. You can specify the `token` if
   * authentication is needed.
   *
   * @param path The path to fetch from
   * @param options An object containing the token and request params
   * @returns The response data
   * @example
   *   fetchDynamicData("/posts", {
   *     token: "exampleToken123",
   *     params: { category: "tech", limit: 5 },
   *   });
   */
  // Configure Axios (Optional)
const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});


// Function to upload token data
export const uploadTokenInfo = async (tokenInfo: ITokenInfo) => {

  try {
    const response = await apiClient.post("/curves", JSON.stringify(tokenInfo));
    console.log("Upload successful:", response.data);
  } catch (error) {
    console.error("Error uploading token info:", error);
  }
};
export const fetchDynamicData = async (path: string, options: { token?: string, params?: Record<string, any> }) => {
     axios.create({
      baseURL: getBaseURL(),
    });
    // if (options.token) {
    //   instance.defaults.headers.Authorization = `Bearer ${options.token}`;
    // }
  
    const response = await apiClient.get(path, {
      params: options.params,
    });
  
    return response.data;
};
export const uploadTokenData = async (path: string, options: { token?: string, params?: Record<string, any> }) => {
  const instance = axios.create({
    baseURL: getBaseURL(),
  });
  // if (options.token) {
  //   instance.defaults.headers.Authorization = `Bearer ${options.token}`;
  // }

  const response = await instance.get(path, {
    params: options.params,
  });

  return response.data;
};
  
  // Usage
//   fetchDynamicData("/posts", { 
//     token: "exampleToken123", 
//     params: { category: "tech", limit: 5 } 
//   });
  


interface IToken {
  address: string;
  curveAddr: string;
  creator: string;
  createdBlock: bigint;
  name: string;
  symbol: string;
  totalSupply: number;
  description: string;
  image: string; // URL or file path
  website: string;
  telegram: string;
  twitter: string;
  replies: string[];
}

export async function uploadToken(tokenData: IToken): Promise<void> {
  try {
    const formData = new FormData();

    // Append fields from IToken to form data
    formData.append('address', tokenData.address);
    formData.append('curveAddr', tokenData.curveAddr);
    formData.append('creator', tokenData.creator);
    formData.append('createdBlock', tokenData.createdBlock as any);
    formData.append('name', tokenData.name);
    formData.append('symbol', tokenData.symbol);
    formData.append('totalSupply', tokenData.totalSupply.toString());
    formData.append('description', tokenData.description);
    formData.append('image', tokenData.image); // The uploaded file
    formData.append('website', tokenData.website);
    formData.append('telegram', tokenData.telegram);
    formData.append('twitter', tokenData.twitter);

    // Append replies array
    // tokenData.replies.forEach((reply, index) => {
    //   formData.append(`replies[${index}]`, reply);
    // });

    // Send the POST request
    // await axios.post(uploadUrl, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    const response = await apiClient.post("/api/tokens", formData);

    console.log('Upload successful:', response.data);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}
const API_BASE_URL = '/api';

export async function fetchTokens() {
  const response = await fetch(`${API_BASE_URL}/tokens`);
  if (!response.ok) {
    throw new Error('Failed to fetch tokens');
  }
  return response.json();
}

export async function fetchTokenDetails(id: string) {
  const response = await fetch(`${API_BASE_URL}/tokens/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch token details');
  }
  return response.json();
}