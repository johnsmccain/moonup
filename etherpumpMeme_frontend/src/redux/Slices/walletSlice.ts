import { createSlice, createAsyncThunk, 
  // PayloadAction 
} from '@reduxjs/toolkit'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

// Define the state type
interface WalletState {
  address: string | null
  status: 'connected' | 'disconnected'
  chainId: number | null
  loading: boolean
  error: string | null
}

// Initial state
const initialState: WalletState = {
  address: null,
  status: 'disconnected',
  chainId: null,
  loading: false,
  error: null,
}

// Thunk to connect wallet
export const connectWalletThunk = createAsyncThunk(
  'wallet/connect',
  async (connector: any, { rejectWithValue }) => {
    const { connect } = useConnect()

    try {
      await connect({ connector })
      const { address, status, chainId } = useAccount()
      return { address, status, chainId }
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

// Thunk to disconnect wallet
export const disconnectWalletThunk = createAsyncThunk(
  'wallet/disconnect',
  async (_, { rejectWithValue }) => {
    const { disconnect } = useDisconnect()

    try {
      await disconnect()
      return { address: null, status: 'disconnected', chainId: null }
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectWalletThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // .addCase(connectWalletThunk.fulfilled, (state, action: PayloadAction<{ address: string; status: string; chainId: number }>) => {
      //   state.address = action.payload.address
      //   state.status = action.payload.status
      //   state.chainId = action.payload.chainId
      //   state.loading = false
      // })
      // .addCase(connectWalletThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
      //   state.error = action.payload || 'Connection failed'
      //   state.loading = false
      // })
      // .addCase(disconnectWalletThunk.fulfilled, (state) => {
      //   state.address = null
      //   state.status = 'disconnected'
      //   state.chainId = null
      // })
      // .addCase(disconnectWalletThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
      //   state.error = action.payload || 'Disconnection failed'
      // })
  },
})

export default walletSlice.reducer
