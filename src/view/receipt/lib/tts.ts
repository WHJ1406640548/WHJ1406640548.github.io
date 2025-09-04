import { Token } from './parser';
export class TTSProvider {
}
export class LocalAliPayTTS extends TTSProvider {
    constructor() {
        super(...arguments);
        this.base = '/alipay/';
    }
    begin() {
        return [`${this.base}diaoluo_da.mp3`, `${this.base}tts_success.mp3`];
    }
    end() {
        return [`${this.base}tts_yuan.mp3`];
    }
    use(token) {
        const digitals = new Set([...Array(10).keys()].map((_, idx) => idx));
        const suffix = new Map([
            [Token.Dian, 'dot'],
            [Token.Shi, 'ten'],
            [Token.Bai, 'hundred'],
            [Token.Qian, 'thousand'],
            [Token.Wan, 'ten_thousand'],
            [Token.Yi, 'ten_million'],
        ]);
        if (digitals.has(token)) {
            return `${this.base}tts_${token}.mp3`;
        }
        if (suffix.has(token)) {
            return `${this.base}tts_${suffix.get(token)}.mp3`;
        }
        throw `invalid token ${token}`;
    }
}
export const alipay = new LocalAliPayTTS();
