import { BackgammonServer } from "./BackgammonServer";

const backgammonServer = new BackgammonServer();
exports.app = backgammonServer.getApp();
