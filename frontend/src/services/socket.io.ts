import { io, Socket } from 'socket.io-client';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

class SocketioService {
    socket: Socket | null = null;
    constructor() {}

    setupSocketConnection(userId: string) {
        this.socket = io(BASE_URL);

        this.socket.on('connect', () => {
        console.log('Socket connected:', this.socket?.id);
        this.socket?.emit('setup', userId);
        });

        this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    joinRoom(roomId: string) {
        if (this.socket) {
            this.socket.emit('join-chat', roomId);
        }
    }

    sendMessage(messageData: any) {
        if (this.socket) {
            this.socket.emit('new-message', messageData);
        }
    }

    onMessageReceived(callback: (newMessage: any) => void) {
        if (this.socket) {
            this.socket.on('message-received', callback);
        }
    }
}

export default new SocketioService();