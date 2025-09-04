import Crunker from 'crunker';
class AudioMerger {
    constructor() {
        this.cache = new Map();
        this._crunker = new Crunker();
    }
    async loadOne(url) {
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }
        const buffers = await this.crunker.fetchAudio(url);
        const [buffer] = buffers;
        this.cache.set(url, buffer);
        return buffer;
    }
    async load(...urls) {
        return await Promise.all(urls.map(url => this.loadOne(url)));
    }
    async concat(...urls) {
        const buffers = await this.load(...urls);
        return this.crunker.concatAudio(buffers);
    }
    async export(audio) {
        const output = await this.crunker.export(audio, 'audio/mp3');
        return output;
    }
    get crunker() {
        return this._crunker;
    }
}
export default new AudioMerger();
