import { NativeBalance } from "./../types/NativeBalance";
import { useCallback, useEffect, useState } from "react";
import Moralis from "moralis";
import { TokenBalance } from "@/types/TokenBalance";
import { useAppContext } from "@/contexts/AppContext";
import { apiKey } from "@/util/addresses";
import { current_chain } from "@/util/chain";

export function useBalances() {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
    const [nativeBalance, setNativeBalance] = useState<NativeBalance>();
    const { address } = useAppContext();

    const fetchTokenBalance = useCallback(async () => {
        try {
            if (!address) return 
            if (!Moralis.Core.isStarted){
                await Moralis.start({apiKey})
            }
            const token_balances = await Moralis.EvmApi.token.getWalletTokenBalances({
                address, 
                chain:current_chain
            })
            setTokenBalances(token_balances.toJSON)
    
        const native_balance = await Moralis.EvmApi.balance.getNativeBalance({
            address,
            chain: current_chain,
        })
        setNativeBalance(native_balance.toJSON)
    }
        catch (error){
            console.log("Error fethcing token balances: " , error)
            setMessage("Error fethcing token balances:" )
           
        }finally{
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        fetchTokenBalance();
    }, [fetchTokenBalance]);

    return {
        loading,
        message,
        tokenBalances,
        nativeBalance,
    };
}
