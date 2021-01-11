"use strict";
exports.__esModule = true;
exports.BackgammonServer = void 0;
var express = require("express");
var SocketIO = require("socket.io");
var uuid_1 = require("uuid");
var http_1 = require("http");
var constants_1 = require("./constants");
var types_1 = require("./types");
var BackgammonServer = /** @class */ (function () {
    function BackgammonServer() {
        this.app = express().use(express.static('public'));
        this.port = process.env.PORT || BackgammonServer.PORT;
        this.httpServer = http_1.createServer(this.app);
        this.io = new SocketIO.Server(this.httpServer);
        this.sessions = new Map;
        this.games = new Map;
        this.listen();
    }
    BackgammonServer.prototype.listen = function () {
        var _this = this;
        this.httpServer.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.io.on(constants_1.Events.CONNECT, function (socket) {
            socket.emit('connected', socket.id);
            var messages = constants_1.getMessages(socket.id, _this.port);
            console.log(messages.connect);
            socket.on(constants_1.Events.DISCONNECT, function () {
                console.log(messages.disconnect);
            });
            socket.on(constants_1.Events.CREATE, function () {
                console.log(messages.create);
                var game = _this.createNewGame(socket);
                socket.join(game.id);
                socket.emit('gameCreated', game);
            });
            socket.on(constants_1.Events.JOIN, function (roomId) {
                socket.join(roomId);
                var msg = "Socket " + socket.id + " joined room " + roomId;
                console.log(msg);
                _this.io.to(roomId).emit('gameReady', _this.games.get(roomId));
                socket.emit('joined', roomId);
            });
            socket.on(constants_1.Events.ROLL, function () {
                console.log(messages.roll);
            });
            socket.on(constants_1.Events.MOVE, function () {
                console.log(messages.move);
            });
            socket.on(constants_1.Events.DOUBLE, function () {
                console.log(messages.double);
            });
            socket.on(constants_1.Events.RESPONSE_DOUBLE, function () {
                console.log(messages.responseDouble);
            });
            socket.on(constants_1.Events.RESIGN, function () {
                console.log(messages.resign);
            });
        });
    };
    //-------------------------------------------------------
    // GAME
    //-------------------------------------------------------
    BackgammonServer.prototype.createNewGame = function (socket) {
        var roomId = uuid_1.v4();
        this.sessions.set(socket.id, { socket: socket, roomId: roomId });
        var game = {
            id: roomId,
            board: this.initializeBoard(),
            players: [this.initializePlayer(socket.id, roomId)],
            dice: [
                { value: 0, numUses: 0 },
                { value: 0, numUses: 0 }
            ],
            isTurnWhite: false
        };
        this.games.set(roomId, game);
        return game;
    };
    //-------------------------------------------------------
    // PLAYER
    //-------------------------------------------------------
    BackgammonServer.prototype.initializePlayer = function (socketId, roomId) {
        return {
            socketId: socketId,
            color: this.games.get(roomId) === null ? types_1.Color.BLACK : types_1.Color.WHITE,
            isFirst: false,
            minPointMovesLeft: 167
        };
    };
    //-------------------------------------------------------
    // BOARD
    //-------------------------------------------------------
    BackgammonServer.prototype.initializeBoard = function () {
        return {
            pips: [
                { color: types_1.Color.BLACK, numCheckers: 2 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.WHITE, numCheckers: 5 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.WHITE, numCheckers: 3 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.BLACK, numCheckers: 5 },
                { color: types_1.Color.WHITE, numCheckers: 5 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.BLACK, numCheckers: 3 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.BLACK, numCheckers: 5 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.NONE, numCheckers: 0 },
                { color: types_1.Color.WHITE, numCheckers: 2 },
            ]
        };
    };
    BackgammonServer.prototype.printBoard = function (board) {
        var getColorCode = function (color) {
            if (types_1.Color.WHITE === color) {
                return '\u25BC';
            }
            else if (types_1.Color.BLACK === color) {
                return '\u25C9';
            }
            return '-';
        };
        var getCellString = function (pip, rowIndex, col) {
            var hasChecker = pip.numCheckers >= rowIndex;
            var color = getColorCode(pip.color);
            var cell = hasChecker ? color : '-';
            if (col === 6 || col === 17) {
                cell += '|';
            }
            return cell;
        };
        var row;
        // TOP OF THE BOARD
        for (var rowIndex = 1; rowIndex < 6; rowIndex++) {
            row = '';
            for (var col = 11; col >= 0; col--) {
                row += getCellString(board.pips[col], rowIndex, col);
            }
            console.log(row);
        }
        // DIVISOR
        console.log('-------------');
        // BOTTOM OF THE BOARD
        for (var rowIndex = 5; rowIndex > 0; rowIndex--) {
            row = '';
            for (var col = 12; col < 24; col++) {
                row += getCellString(board.pips[col], rowIndex, col);
            }
            console.log(row);
        }
    };
    BackgammonServer.prototype.getApp = function () { return this.app; };
    ;
    BackgammonServer.PORT = 8080;
    return BackgammonServer;
}());
exports.BackgammonServer = BackgammonServer;
