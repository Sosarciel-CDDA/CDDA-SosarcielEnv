import { DataManager } from "cdda-event";
export declare const DESTORY_U_EOCID = "DestoryU";
/**用于必定成功的控制法术的flags */
export declare const CON_SPELL_FLAG: readonly ["SILENT", "NO_HANDS", "NO_LEGS", "NO_FAIL", "NO_EXPLOSION_SFX"];
/**完全回复EOC */
export declare const FULL_RECIVERY_EOCID: import("cdda-schema").EocID;
export declare function buildBaseData(dm: DataManager): Promise<void>;
