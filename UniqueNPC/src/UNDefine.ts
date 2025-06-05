import path from 'pathe';
import { UtilFT } from '@zwa73/utils';
import { ModDefine } from '@sosarciel-cdda/cdda-schema';









export const UNDef = new ModDefine("UNPC");
export const DATA_PATH = path.join(process.cwd(),'data');
export const ENV_PATH = path.join(process.cwd(),'..');
export const GAME_PATH = (UtilFT.loadJSONFileSync(path.join(ENV_PATH,'build_setting.json'))! as any).game_path as string;
export const OUT_PATH = path.join(GAME_PATH,'data','mods','UniqueNPC');