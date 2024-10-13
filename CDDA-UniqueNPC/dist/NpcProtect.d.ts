import { DataManager } from "cdda-event";
import { BoolObj, Eoc, EocEffect, EocID } from "cdda-schema";
/**出生点ID */
export declare const SpawnLocID = "UniqueNpc_SpawnLoc";
/**生成遍历npc的eoc */
export declare const eachCharEoc: (id: EocID, effectList: EocEffect[], cond?: BoolObj, forceId?: boolean) => Eoc;
export declare function buildNpcProtect(dm: DataManager): Promise<void>;
