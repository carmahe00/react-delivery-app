import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

/**
 * 
 * @param serverPath http://192.168.20.27:3000
 * @returns intance of socket io for client
 */
export const useSocket = (serverPath: string) => {

    const socket = useMemo(() => io(serverPath), [serverPath]);
    const [online, setOnline] = useState(false);

    useEffect(() => {
        socket.connect()
        setOnline(socket.connected);
    }, [])

    // useEffect(() => {
    //     socket.on('connect', () => {
    //         console.log('Connected to the server');
    //         setOnline(socket.connected)
    //     });
    // }, [socket])

    // useEffect(() => {
    //     socket.on('connect_error', (error) => {
    //         console.error('Connection error:', error);
    //     });
    // }, [socket])

    // useEffect(() => {
    //     socket.on('disconnect', () => setOnline(false));
    // }, [socket])

    return {
        socket,
        online
    }
}