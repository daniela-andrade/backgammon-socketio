"use strict";
exports.__esModule = true;
exports.app = void 0;
var BackgammonServer_1 = require("./BackgammonServer");
var backgammonServer = new BackgammonServer_1.BackgammonServer();
var app = backgammonServer.getApp();
exports.app = app;
backgammonServer.printBoard(backgammonServer.initializeBoard());
