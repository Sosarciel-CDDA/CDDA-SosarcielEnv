"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = build;
const cdda_event_1 = require("cdda-event");
const UNDefine_1 = require("./UNDefine");
const BaseData_1 = require("./BaseData");
const NpcProtect_1 = require("./NpcProtect");
async function build() {
    const undm = new cdda_event_1.DataManager(UNDefine_1.DATA_PATH, UNDefine_1.OUT_PATH, "CNPCUNEF", { enableMoveStatus: false });
    await (0, BaseData_1.buildBaseData)(undm);
    await (0, NpcProtect_1.buildNpcProtect)(undm);
    await undm.saveAllData();
}
