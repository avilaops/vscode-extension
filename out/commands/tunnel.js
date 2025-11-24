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
exports.TunnelCommands = void 0;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class TunnelCommands {
    constructor() {
        const config = vscode.workspace.getConfiguration('avila');
        this.tunnelName = config.get('tunnel.name', 'asus');
    }
    async status() {
        try {
            vscode.window.showInformationMessage('Checking tunnel status...');
            const { stdout } = await execAsync('code tunnel status');
            const status = JSON.parse(stdout);
            const tunnelUrl = `https://vscode.dev/tunnel/${this.tunnelName}`;
            const isConnected = status.tunnel?.tunnel === 'Connected';
            if (isConnected) {
                const message = `Tunnel "${this.tunnelName}" está conectado!\nURL: ${tunnelUrl}`;
                vscode.window.showInformationMessage(message, 'Open in Browser')
                    .then(selection => {
                    if (selection === 'Open in Browser') {
                        vscode.env.openExternal(vscode.Uri.parse(tunnelUrl));
                    }
                });
            }
            else {
                vscode.window.showWarningMessage(`Tunnel "${this.tunnelName}" não está conectado`);
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Erro ao verificar tunnel: ${error}`);
        }
    }
    async start() {
        try {
            const scriptPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath + '\\manage-tunnel.ps1';
            vscode.window.showInformationMessage(`Starting tunnel "${this.tunnelName}"...`);
            const terminal = vscode.window.createTerminal('Avila Tunnel');
            terminal.show();
            terminal.sendText(`powershell -ExecutionPolicy Bypass -File "${scriptPath}" start`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Erro ao iniciar tunnel: ${error}`);
        }
    }
    async stop() {
        try {
            const scriptPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath + '\\manage-tunnel.ps1';
            vscode.window.showInformationMessage(`Stopping tunnel "${this.tunnelName}"...`);
            const terminal = vscode.window.createTerminal('Avila Tunnel');
            terminal.show();
            terminal.sendText(`powershell -ExecutionPolicy Bypass -File "${scriptPath}" stop`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Erro ao parar tunnel: ${error}`);
        }
    }
}
exports.TunnelCommands = TunnelCommands;
//# sourceMappingURL=tunnel.js.map