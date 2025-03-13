interface TokenUsage {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
}
declare class Logger {
    private logFile;
    constructor();
    private getTimestamp;
    private formatLogMessage;
    log(data: {
        chatId: string;
        sender: string;
        message: string;
        mode?: string;
        userMessage?: string;
        status?: string;
        tokenUsage?: TokenUsage;
    }): void;
}
export declare const logger: Logger;
export {};
