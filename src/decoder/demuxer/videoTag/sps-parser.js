import { readBuffer } from '../../utils/buffer';

export default class SPSParser {
    static getProfileString(profileIdc) {
        switch (profileIdc) {
            case 66:
                return 'Baseline';
            case 77:
                return 'Main';
            case 88:
                return 'Extended';
            case 100:
                return 'High';
            case 110:
                return 'High10';
            case 122:
                return 'High422';
            case 244:
                return 'High444';
            default:
                return 'Unknown';
        }
    }

    static parser(uint8) {
        const result = {};
        const readSPS = readBuffer(uint8);
        readSPS(1);
        [result.profile_idc] = readSPS(1);
        readSPS(1);
        [result.level_idc] = readSPS(1);
        console.log(uint8, result);
        return result;
    }
}
