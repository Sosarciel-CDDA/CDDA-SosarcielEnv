"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eachCharEoc = exports.SpawnLocID = void 0;
exports.buildNpcProtect = buildNpcProtect;
const UNDefine_1 = require("./UNDefine");
const BaseData_1 = require("./BaseData");
/**出生点ID */
exports.SpawnLocID = "UniqueNpc_SpawnLoc";
/**全局UniqueNPC的数量 */
const UniqueNpcCountVarID = "UniqueNpcCount";
/**根据编号获得全局UniqueNPC的charid存储变量 */
const UniqueNpcID = (str) => `UniqueNpcID_${str}`;
/**生成遍历npc的eoc */
const eachCharEoc = (id, effectList, cond, forceId) => UNDefine_1.UNDef.genActEoc(id, [
    { math: ['eachIndex', '=', '0'] },
    {
        run_eoc_until: {
            id: 'EachNpcUntilInline',
            eoc_type: 'ACTIVATION',
            effect: [
                { u_message: "each <global_val:eachIndex>" },
                { math: ['eachIndex', '+=', '1'] },
                { set_string_var: UniqueNpcID(`<global_val:eachIndex>`), target_var: { context_val: 'charidPtr' }, parse_tags: true },
                { run_eoc_with: {
                        id: `${id}_runeocwithinline`,
                        eoc_type: 'ACTIVATION',
                        effect: effectList
                    },
                    alpha_talker: { var_val: 'charidPtr' } },
            ]
        },
        //condition:{ math:['_eachIndex','<=',UniqueNpcCountVarID] },
        iteration: { math: [UniqueNpcCountVarID] }
    }
], cond, forceId);
exports.eachCharEoc = eachCharEoc;
//npc保护
async function buildNpcProtect(dm) {
    const out = [];
    //递归随机传送
    const randTeleportEocID = UNDefine_1.UNDef.genEOCID('RandTeleport');
    const randTeleport = UNDefine_1.UNDef.genActEoc(randTeleportEocID, [
        { u_location_variable: { context_val: 'tmploc' } },
        { location_variable_adjust: { context_val: 'tmploc' },
            x_adjust: { math: ['rand(2)-1'] },
            y_adjust: { math: ['rand(2)-1'] }
        },
        { run_eoc_with: {
                id: `RandTeleport_runeocwithinline`,
                eoc_type: 'ACTIVATION',
                effect: [{ if: 'u_is_character', then: [{ run_eocs: [randTeleportEocID] }] }],
            }, alpha_loc: { context_val: 'tmploc' } },
        { u_teleport: { context_val: 'tmploc' }, force: true },
    ], undefined, true);
    out.push(randTeleport);
    //传送到出生点
    const teleportToSpawn = UNDefine_1.UNDef.genActEoc('TeleportToSpawn', [
        { run_eoc_with: {
                id: `TeleportToSpawn_runeocwithinline`,
                eoc_type: 'ACTIVATION',
                effect: [{ if: 'u_is_character', then: [{ run_eocs: [randTeleport.id] }] }],
            }, alpha_loc: { global_val: exports.SpawnLocID } },
        { u_teleport: { global_val: exports.SpawnLocID }, force: true },
    ]);
    out.push(teleportToSpawn);
    /**alpha是有效的npc */
    const UIsVaildNpc = 'u_isVaildUniqueNpc';
    //死亡保护
    const pdeath = UNDefine_1.UNDef.genActEoc('DeathRebirth', [
        { run_eocs: [teleportToSpawn.id, BaseData_1.FULL_RECIVERY_EOCID] },
    ], { or: [
            { math: [UIsVaildNpc, '==', '1'] },
            'u_is_avatar',
        ] });
    dm.addInvokeID('DeathPrev', -100, pdeath.id);
    out.push(pdeath);
    //出生点设置
    const spawnLocSet = UNDefine_1.UNDef.genActEoc('SpawnLocSet', [
        { u_location_variable: { global_val: exports.SpawnLocID } },
    ]);
    dm.addInvokeID('GameStart', 0, spawnLocSet.id);
    out.push(spawnLocSet);
    //初始化Npc
    const InitNpc = UNDefine_1.UNDef.genActEoc('InitNpc', [
        { set_string_var: '<u_name>', target_var: { context_val: 'uname' }, parse_tags: true },
        {
            if: { math: [`v_uname`, '>=', '1'] },
            then: [{ run_eocs: [BaseData_1.DESTORY_U_EOCID] }],
            else: [
                { math: [UIsVaildNpc, '=', '1'] },
                { math: [`v_uname`, '=', '1'] },
                { math: [UniqueNpcCountVarID, '+=', '1'] },
                { set_string_var: UniqueNpcID(`<global_val:${UniqueNpcCountVarID}>`), target_var: { context_val: 'charidPtr' }, parse_tags: true },
                { u_set_talker: { var_val: "charidPtr" } },
            ],
        }
    ], { u_has_trait: BaseData_1.UNIQUE_NPC_MUTID });
    dm.addInvokeID('Init', 0, InitNpc.id);
    out.push(InitNpc);
    //召集npc法术
    const GatheringEoc = (0, exports.eachCharEoc)('Gathering', [
        { run_eocs: [teleportToSpawn.id] },
    ]);
    const GatheringSpell = {
        id: UNDefine_1.UNDef.genSpellID('Gathering'),
        name: "召集",
        description: "召集所有npc回到出生点",
        type: 'SPELL',
        effect: 'effect_on_condition',
        effect_str: GatheringEoc.id,
        valid_targets: ['self'],
        shape: 'blast',
        flags: [...BaseData_1.CON_SPELL_FLAG],
    };
    out.push(GatheringEoc, GatheringSpell);
    dm.addData(out, 'protect');
}
