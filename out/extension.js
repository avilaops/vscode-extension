"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const tunnel_1 = require("./commands/tunnel");
const avx_1 = require("./commands/avx");
const database_1 = require("./commands/database");
const statusBar_1 = require("./ui/statusBar");
function activate(context) {
    console.log('Avila Platform extension is now active!');
    // Status Bar
    const statusBar = new statusBar_1.StatusBarManager();
    context.subscriptions.push(statusBar);
    // Tunnel Commands
    const tunnelCommands = new tunnel_1.TunnelCommands();
    context.subscriptions.push(vscode.commands.registerCommand('avila.tunnel.status', () => tunnelCommands.status()), vscode.commands.registerCommand('avila.tunnel.start', () => tunnelCommands.start()), vscode.commands.registerCommand('avila.tunnel.stop', () => tunnelCommands.stop()));
    // AVX Commands
    const avxCommands = new avx_1.AvxCommands();
    context.subscriptions.push(vscode.commands.registerCommand('avila.avx.status', () => avxCommands.status()), vscode.commands.registerCommand('avila.avx.deploy', () => avxCommands.deploy()));
    // Database Commands
    const dbCommands = new database_1.DatabaseCommands();
    context.subscriptions.push(vscode.commands.registerCommand('avila.db.query', () => dbCommands.query()));
    // Welcome message
    vscode.window.showInformationMessage('Avila Platform extension loaded! 🚀');
}
function deactivate() {
    console.log('Avila Platform extension is now deactivated');
}
//# sourceMappingURL=extension.js.map