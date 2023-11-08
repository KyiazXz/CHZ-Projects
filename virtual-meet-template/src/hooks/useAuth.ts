import { useAppContext } from "@/contexts/AppContext";
import { disconnect } from "process";

import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export function useAuth() {

    const {address, isConnected} = useAccount ()
    const { setAddress, setIsConnected } = useAppContext();

    const {connect} = useConnect ( { 
        connector: new InjectedConnector ()
    })

    const {disconnect} = useDisconnect ( )

    const handleConnect = async () => {
        try{
            if (isConnected) {
                await handleConnect()
            }
             await connect () ;
             setAddress (address ?? "" ) ; 
             setIsConnected (isConnected) ;
        }
        catch (e ){
            console.log ("error connecting : " + e )
        }
    };

    const handleDisconnect = async () => {
        try{
             await disconnect()
             setAddress (address ?? "" ) ; 
             setIsConnected (isConnected) ;
        }
        catch (e ){
            console.log ("error connecting : " + e )
        }
    };

    return {
        address,
        isConnected,
        handleConnect,
        handleDisconnect,
    };
}
