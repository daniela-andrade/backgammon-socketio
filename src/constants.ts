export enum Events {
    CONNECT = "connect",
    CONNECTED = "connected",
    DISCONNECT = "disconnect",
    CREATE = "create",
    JOIN = "join",
    ROLL = "roll",
    MOVE = "move",
    DOUBLE = "double",
    RESPONSE_DOUBLE = "responseDouble",
    RESIGN = "resign"
}

export const getMessages = (player: string, port: number | string) => {
    return {
        connect: "Player " + player + " trying to connect on port " + port + ".",
        connected: "Player " + player + " connected on port " + port + ".",
        disconnect: "Player " + player + " disconnected.",
        create: "Player " + player + " created a new game.",
        join: "Player " + player + " joined a game.",
        roll: "Player " + player + " rolled the dice.",
        move: "Player " + player + " moved.",
        double: "Player " + player + " doubled the offer.",
        responseDouble: "Player " + player + " replied to a doubling offer.",
        resign: "Player " + player + " resigned."
    }
}
