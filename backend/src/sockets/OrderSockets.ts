import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

class OrderSocket {
    constructor(public io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>){
        this.io = io;
        this.socketEvents()
    }
    socketEvents() {
        // On connection
        this.io.of("/orders/delivery").on('connection', ( socket ) => {
            console.log("Client connected")
            socket.on("position", (data) =>{
                console.log("Client Emit:", data)
                socket.broadcast.emit(`position/${data.id_order}`, {id_order: data.id_order, lat: data.lat , lng: data.lng})
            })
            socket.on("disconnect", data =>{
                console.log("client disconnected")
            })
        
        });
    }
}

export default OrderSocket