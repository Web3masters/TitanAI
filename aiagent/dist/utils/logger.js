"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    constructor() {
        this.logFile = path_1.default.join(__dirname, '..', 'logs', 'chat.log');
        // Ensure logs directory exists
        const logDir = path_1.default.dirname(this.logFile);
        if (!fs_1.default.existsSync(logDir)) {
            fs_1.default.mkdirSync(logDir, { recursive: true });
        }
    }
    getTimestamp() {
        return new Date().toISOString();
    }
    formatLogMessage(data) {
        const timestamp = chalk_1.default.gray(`[${this.getTimestamp()}]`);
        const chatId = chalk_1.default.blue(`[ChatID: ${data.chatId}]`);
        const sender = chalk_1.default.yellow(`[${data.sender}]`);
        const mode = data.mode ? chalk_1.default.magenta(`[Mode: ${data.mode}]`) : '';
        const status = data.status ? chalk_1.default.green(`[Status: ${data.status}]`) : '';
        const tokens = data.tokenUsage
            ? chalk_1.default.cyan(`[Tokens: ${data.tokenUsage.totalTokens} (prompt:${data.tokenUsage.promptTokens}, completion:${data.tokenUsage.completionTokens})]`)
            : '';
        const message = chalk_1.default.white(data.message);
        return {
            consoleLog: `${timestamp} ${chatId} ${sender} ${mode} ${status} ${tokens}\n${message}\n`,
            fileLog: `[${this.getTimestamp()}] [ChatID: ${data.chatId}] [${data.sender}]${data.mode ? ' [Mode: ' + data.mode + ']' : ''}${data.status ? ' [Status: ' + data.status + ']' : ''}${data.tokenUsage ? ' [Tokens: ' + data.tokenUsage.totalTokens + ' (prompt:' + data.tokenUsage.promptTokens + ', completion:' + data.tokenUsage.completionTokens + ')]' : ''}\n${data.message}\n`
        };
    }
    log(data) {
        const formatted = this.formatLogMessage(data);
        // Log to console
        console.log(formatted.consoleLog);
        // Append to file
        fs_1.default.appendFileSync(this.logFile, formatted.fileLog + '\n');
    }
}
exports.logger = new Logger();
