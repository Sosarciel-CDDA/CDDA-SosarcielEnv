"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FULL_RECIVERY_EOCID = exports.CON_SPELL_FLAG = exports.DESTORY_U_EOCID = void 0;
exports.buildBaseData = buildBaseData;
const UNDefine_1 = require("./UNDefine");
const Export_1 = require("./Export");
const UniqueNpcMut = {
    id: Export_1.UNIQUE_NPC_MUTID,
    name: "独特的NPC",
    purifiable: false,
    valid: false,
    player_display: false,
    points: 0,
    type: "mutation",
    description: "独特NPC标志",
};
exports.DESTORY_U_EOCID = "DestoryU";
const KillUEoc = {
    id: exports.DESTORY_U_EOCID,
    eoc_type: "ACTIVATION",
    type: "effect_on_condition",
    effect: [
        { u_location_variable: { global_val: "tmp_loc" }, z_adjust: -10, z_override: true },
        { u_teleport: { global_val: "tmp_loc" }, force: true },
        { math: [`u_hp('ALL')`, '=', '0'] },
        //{run_eoc_with:{
        //    id:"KillUFutureInline",
        //    eoc_type:'ACTIVATION',
        //    effect:[{
        //        u_map_run_item_eocs: "all",
        //        search_data: [{ id: "corpse" as AnyItemID }],
        //        loc: {global_val:"tmp_loc"},
        //        min_radius: 0,
        //        max_radius: 0,
        //        true_eocs: [{
        //            id: "KillUFutureSearchInline",
        //            eoc_type: "ACTIVATION",
        //            effect: ["npc_die"],
        //        }],
        //    }]
        //},
        //time_in_future:1
        //},
    ],
};
/**用于必定成功的控制法术的flags */
exports.CON_SPELL_FLAG = ["SILENT", "NO_HANDS", "NO_LEGS", "NO_FAIL", "NO_EXPLOSION_SFX"];
const TestNpcClass = {
    type: 'npc_class',
    id: UNDefine_1.UNDef.genNpcClassID("TestClass"),
    name: "UniqueNpcTestClass",
    job_description: "UniqueNPC测试职业",
    common: false,
    traits: [
        { trait: UniqueNpcMut.id }
    ],
};
const TestNpcInstance = {
    type: "npc",
    id: UNDefine_1.UNDef.genNpcInstanceID("TestNpc"),
    class: TestNpcClass.id,
    //name_unique:'UniqueNpcTestInstance',
    attitude: 0,
    mission: 0,
    faction: "your_followers",
    chat: "TALK_DONE",
};
/**生成器 */
const TestNpcSpawner = {
    type: "GENERIC",
    id: UNDefine_1.UNDef.genGenericID('TestNpcSpawner'),
    name: { str_sp: `UniqueNpc测试生成器` },
    description: `生成一个 UniqueNpc`,
    use_action: {
        type: "effect_on_conditions",
        description: `生成一个 UniqueNpc`,
        menu_text: `生成一个 UniqueNpc`,
        effect_on_conditions: [UNDefine_1.UNDef.genEOCID('TestNpcSpawner')],
    },
    weight: 1,
    volume: 1,
    symbol: "O"
};
/**生成器EOC */
const TestNpcSpawnerEoc = {
    type: "effect_on_condition",
    eoc_type: "ACTIVATION",
    id: UNDefine_1.UNDef.genEOCID('TestNpcSpawner'),
    effect: [
        {
            u_spawn_npc: TestNpcInstance.id,
            real_count: 1,
            min_radius: 1,
            max_radius: 1,
        },
    ],
};
/**完全回复EOC */
exports.FULL_RECIVERY_EOCID = UNDefine_1.UNDef.genEOCID("FullRecovery");
/**完全回复 */
const FullRecivery = {
    type: "effect_on_condition",
    eoc_type: "ACTIVATION",
    id: exports.FULL_RECIVERY_EOCID,
    effect: [
        "u_prevent_death",
        { math: ["u_calories()", "=", "max( u_calories(), 9000)"] },
        { math: ["u_val('thirst')", "=", "min( u_val('thirst'), 800)"] },
        { math: ["u_vitamin('redcells')", "=", "0"] },
        { math: ["u_vitamin('bad_food')", "=", "0"] },
        { math: ["u_vitamin('blood')", "=", "0"] },
        { math: ["u_vitamin('instability')", "=", "0"] },
        { math: ["u_pain()", "=", "0"] },
        { math: ["u_val('rad')", "=", "0"] },
        { math: ["u_hp('ALL')", "=", "999"] },
        //{ u_set_hp: 1000, max: true},
        { u_add_effect: "cureall", duration: "1 s", intensity: 1 },
        { u_add_effect: "panacea", duration: "30 s", intensity: 1 },
        { u_lose_effect: "corroding" },
        { u_lose_effect: "onfire" },
        { u_lose_effect: "dazed" },
        { u_lose_effect: "stunned" },
        { u_lose_effect: "venom_blind" },
        { u_lose_effect: "formication" },
        { u_lose_effect: "blisters" },
        { u_lose_effect: "frostbite" },
        { u_lose_effect: "frostbite_recovery" },
        { u_lose_effect: "wet" },
        { u_lose_effect: "slimed" },
        { u_lose_effect: "migo_atmosphere" },
        { u_lose_effect: "fetid_goop" },
        { u_lose_effect: "sap" },
        { u_lose_effect: "nausea" },
        { u_lose_effect: "bleed" },
    ],
};
async function buildBaseData(dm) {
    const out = [UniqueNpcMut, FullRecivery, KillUEoc, TestNpcClass, TestNpcInstance, TestNpcSpawner, TestNpcSpawnerEoc];
    dm.addData(out, "base");
}
