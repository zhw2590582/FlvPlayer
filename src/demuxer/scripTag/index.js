import { readBuffer, readDouble, readBoolean, readString, readBufferSum } from '../../utils/buffer';

export default class ScripTag {
    constructor(flv) {
        this.flv = flv;
    }

    demuxer(tag) {
        const { debug } = this.flv;
        const readScripTag = readBuffer(tag.body);
        const amf1 = Object.create(null);
        const amf2 = Object.create(null);

        [amf1.type] = readScripTag(1);
        debug.error(amf1.type === 2, `AMF: [amf1] type expect 2, but got ${amf1.type}`);
        amf1.size = readBufferSum(readScripTag(2));
        amf1.string = readString(readScripTag(amf1.size));

        [amf2.type] = readScripTag(1);
        debug.error(amf2.type === 8, `AMF: [amf2] type expect 8, but got ${amf2.type}`);
        amf2.size = readBufferSum(readScripTag(4));
        amf2.metaData = Object.create(null);

        function getValue(type) {
            let value = null;
            if (type !== undefined) {
                switch (type) {
                    case 0:
                        value = readDouble(readScripTag(8));
                        break;
                    case 1:
                        value = readBoolean(readScripTag(1));
                        break;
                    case 2: {
                        const valueLength = readBufferSum(readScripTag(2));
                        value = readString(readScripTag(valueLength));
                        break;
                    }
                    case 3: {
                        value = Object.create(null);
                        let lastType = -1;
                        while (lastType !== 9) {
                            const nameLength = readBufferSum(readScripTag(2));
                            const name = readString(readScripTag(nameLength));
                            const itemType = readScripTag(1)[0];
                            if (name) {
                                value[name] = getValue(itemType);
                            }
                            lastType = itemType;
                        }
                        break;
                    }
                    case 5:
                        value = null;
                        break;
                    case 6:
                        value = undefined;
                        break;
                    case 7:
                        value = `Reference #${readScripTag.index}`;
                        readScripTag(2);
                        break;
                    case 8: {
                        value = Object.create(null);
                        let lastType = -1;
                        while (lastType !== 9) {
                            const nameLength = readBufferSum(readScripTag(2));
                            const name = readString(readScripTag(nameLength));
                            const itemType = readScripTag(1)[0];
                            if (name) {
                                value[name] = getValue(itemType);
                            }
                            lastType = itemType;
                        }
                        break;
                    }
                    case 10: {
                        const valueLength = readBufferSum(readScripTag(4));
                        value = [];
                        for (let index = 0; index < valueLength; index += 1) {
                            const itemType = readScripTag(1)[0];
                            value.push(getValue(itemType));
                        }
                        break;
                    }
                    case 11:
                        value = readDouble(readScripTag(2));
                        break;
                    case 12: {
                        const valueLength = readBufferSum(readScripTag(4));
                        value = readString(readScripTag(valueLength));
                        break;
                    }
                    default:
                        debug.error(false, `AMF: Unknown metaData type: ${type}`);
                        break;
                }
            }
            return value;
        }

        while (readScripTag.index < tag.body.length) {
            const nameLength = readBufferSum(readScripTag(2));
            const name = readString(readScripTag(nameLength));
            const type = readScripTag(1)[0];
            if (name) {
                amf2.metaData[name] = getValue(type);
            }
        }

        debug.error(readScripTag.index === tag.body.length, 'AMF: Seems to be incompletely parsed');
        debug.error(amf2.size === Object.keys(amf2.metaData).length, 'AMF: [amf2] length does not match');

        return {
            amf1,
            amf2,
        };
    }
}
