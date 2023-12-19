import React, { ReactNode, createContext } from 'react'
import { useSocket } from '../../hooks/useSocket';
import { Socket } from 'socket.io-client';
export interface ShoppingBagContext {
    socket: Socket
    online:boolean
}
export const SocketContext = createContext<ShoppingBagContext>({} as ShoppingBagContext);
type SocketProvideProps = {
    children: ReactNode;
  };
const SocketProvide = ({ children }:SocketProvideProps) => {
    const { socket, online } = useSocket('http://192.168.20.27:3000/orders/delivery');
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}

export default SocketProvide