export default function mergeAudioBuffers(buffers, ac) {
    let maxChannels = 0;
    let maxDuration = 0;
    for (let i = 0; i < buffers.length; i += 1) {
        if (buffers[i].numberOfChannels > maxChannels) {
            maxChannels = buffers[i].numberOfChannels;
        }
        if (buffers[i].duration > maxDuration) {
            maxDuration = buffers[i].duration;
        }
    }
    const out = ac.createBuffer(maxChannels, ac.sampleRate * maxDuration, ac.sampleRate);
    for (let j = 0; j < buffers.length; j += 1) {
        for (let srcChannel = 0; srcChannel < buffers[j].numberOfChannels; srcChannel += 1) {
            const outt = out.getChannelData(srcChannel);
            const inn = buffers[j].getChannelData(srcChannel);
            for (let i = 0; i < inn.length; i += 1) {
                outt[i] += inn[i];
            }
            out.getChannelData(srcChannel).set(outt, 0);
        }
    }
    return out;
}
