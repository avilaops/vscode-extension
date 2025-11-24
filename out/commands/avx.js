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
exports.AvxCommands = void 0;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class AvxCommands {
    constructor() {
        const config = vscode.workspace.getConfiguration('avila');
        this.apiUrl = config.get('avx.apiUrl', 'http://localhost:8080');
    }
    async status() {
        try {
            vscode.window.showInformationMessage('Checking platform status...');
            const { stdout } = await execAsync('avx platform status --output json');
            const status = JSON.parse(stdout);
            if (status.healthy) {
                vscode.window.showInformationMessage('✅ Platform is healthy!');
            }
            else {
                vscode.window.showWarningMessage('⚠️ Platform has issues');
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error checking platform: ${error}`);
        }
    }
    async deploy() {
        try {
            const answer = await vscode.window.showWarningMessage('Deploy to production?', { modal: true }, 'Yes, Deploy', 'Cancel');
            if (answer !== 'Yes, Deploy') {
                return;
            }
            const terminal = vscode.window.createTerminal('Avila Deploy');
            terminal.show();
            // Run deployment sequence
            terminal.sendText('cargo build --workspace --release');
            terminal.sendText('cargo test --workspace');
            terminal.sendText('avx platform deploy --config prod.toml');
        }
        catch (error) {
            vscode.window.showErrorMessage(`Deployment error: ${error}`);
        }
    }
}
exports.AvxCommands = AvxCommands;
//# sourceMappingURL=avx.js.map