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
exports.DatabaseCommands = void 0;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class DatabaseCommands {
    constructor() {
        const config = vscode.workspace.getConfiguration('avila');
        this.defaultCollection = config.get('database.defaultCollection', 'users');
    }
    async query() {
        try {
            // Ask for collection
            const collection = await vscode.window.showInputBox({
                prompt: 'Collection name',
                value: this.defaultCollection,
                placeHolder: 'users'
            });
            if (!collection) {
                return;
            }
            // Ask for query filter
            const filter = await vscode.window.showInputBox({
                prompt: 'Query filter',
                placeHolder: 'age > 18',
                value: ''
            });
            // Execute query
            vscode.window.showInformationMessage(`Querying ${collection}...`);
            const command = filter
                ? `avx db query ${collection} --filter "${filter}" --output json`
                : `avx db query ${collection} --output json`;
            const { stdout } = await execAsync(command);
            const results = JSON.parse(stdout);
            // Show results in new editor
            const doc = await vscode.workspace.openTextDocument({
                content: JSON.stringify(results, null, 2),
                language: 'json'
            });
            await vscode.window.showTextDocument(doc);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Query error: ${error}`);
        }
    }
}
exports.DatabaseCommands = DatabaseCommands;
//# sourceMappingURL=database.js.map