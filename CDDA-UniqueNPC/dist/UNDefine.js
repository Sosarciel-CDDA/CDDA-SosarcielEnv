"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OUT_PATH = exports.GAME_PATH = exports.ENV_PATH = exports.DATA_PATH = exports.UNDef = void 0;
const pathe_1 = __importDefault(require("pathe"));
const utils_1 = require("@zwa73/utils");
const cdda_schema_1 = require("cdda-schema");
exports.UNDef = new cdda_schema_1.ModDefine("UNPC");
exports.DATA_PATH = pathe_1.default.join(process.cwd(), 'data');
exports.ENV_PATH = pathe_1.default.join(process.cwd(), '..');
exports.GAME_PATH = utils_1.UtilFT.loadJSONFileSync(pathe_1.default.join(exports.ENV_PATH, 'build_setting.json')).game_path;
exports.OUT_PATH = pathe_1.default.join(exports.GAME_PATH, 'data', 'mods', 'UniqueNPC');
