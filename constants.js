"use strict";
exports.__esModule = true;
exports.getMessages = exports.Events = void 0;
var Events;
(function (Events) {
    Events["CONNECT"] = "connect";
    Events["CONNECTED"] = "connected";
    Events["DISCONNECT"] = "disconnect";
    Events["CREATE"] = "create";
    Events["JOIN"] = "join";
    Events["ROLL"] = "roll";
    Events["MOVE"] = "move";
    Events["DOUBLE"] = "double";
    Events["RESPONSE_DOUBLE"] = "responseDouble";
    Events["RESIGN"] = "resign";
})(Events = exports.Events || (exports.Events = {}));
var getMessages = function (player, port) {
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
    };
};
exports.getMessages = getMessages;
