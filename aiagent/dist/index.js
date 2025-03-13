"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatbot_1 = require("./chatbot");
/***************************************************
 * Start server
 ***************************************************/
const PORT = process.env.PORT || 3000;
const startServer = (port) => {
    const server = chatbot_1.app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use. Trying another port...`);
            server.close();
            startServer(0); // Try a random available port
        }
        else {
            console.error(err);
        }
    });
    server.on('listening', () => {
        const address = server.address();
        if (typeof address === 'string') {
            console.log(`Server is now running on address ${address}`);
        }
        else if (address && address.port) {
            console.log(`Server is now running on port ${address.port}`);
        }
        else {
            console.error('Failed to get the new server address.');
        }
    });
};
startServer(PORT);
exports.default = chatbot_1.app;
