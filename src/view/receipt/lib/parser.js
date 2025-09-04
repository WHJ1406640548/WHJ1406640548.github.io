export var Token;
(function (Token) {
    Token[Token["D0"] = 0] = "D0";
    Token[Token["D1"] = 1] = "D1";
    Token[Token["D2"] = 2] = "D2";
    Token[Token["D3"] = 3] = "D3";
    Token[Token["D4"] = 4] = "D4";
    Token[Token["D5"] = 5] = "D5";
    Token[Token["D6"] = 6] = "D6";
    Token[Token["D7"] = 7] = "D7";
    Token[Token["D8"] = 8] = "D8";
    Token[Token["D9"] = 9] = "D9";
    Token[Token["Dian"] = 10] = "Dian";
    Token[Token["Shi"] = 11] = "Shi";
    Token[Token["Bai"] = 12] = "Bai";
    Token[Token["Qian"] = 13] = "Qian";
    Token[Token["Wan"] = 14] = "Wan";
    Token[Token["Yi"] = 15] = "Yi";
})(Token || (Token = {}));
function parseTill10K(n) {
    if (n >= 10000 || n < 0) {
        throw `value must be between 0 and 10000 (n=${n})`;
    }
    const digits = [1000, 100, 10, 1].map(i => Math.floor(n / i) % 10).map(i => i);
    const ans = [];
    if (digits[0] != Token.D0) {
        ans.push(digits[0], Token.Qian);
    }
    if (digits[1] != Token.D0) {
        ans.push(digits[1], Token.Bai);
    }
    else if (digits[0] != Token.D0 && (digits[2] != Token.D0 || digits[3] != Token.D0)) {
        ans.push(Token.D0);
    }
    if (digits[2] == Token.D1 && digits[1] == Token.D0) {
        ans.push(Token.Shi);
    }
    else if (digits[2] != Token.D0) {
        ans.push(digits[2], Token.Shi);
    }
    else if (digits[1] != Token.D0 && digits[3] != Token.D0) {
        ans.push(Token.D0);
    }
    if (digits[3] != Token.D0 || digits.filter(d => d == Token.D0).length == digits.length) {
        ans.push(digits[3]);
    }
    return ans;
}
function splitToSections(n) {
    const i = Math.floor(n);
    const d = Math.round(n * 100) % 100;
    if (n < 0 || n > 999999999999.99) {
        throw `value must be between 0 and 9999_9999_9999.99 (n=${n})`;
    }
    return {
        yi: Math.floor(i / 100000000),
        wan: Math.floor(i / 10000) % 10000,
        yuan: i % 10000,
        jiao: Math.floor(d / 10),
        fen: d % 10,
    };
}
function needPrefixD0(n, largeSections) {
    return largeSections.some(i => i > 0) && n > 0 && n < 1000;
}
export function parse(n) {
    if (Math.floor(n * 100) == 0) {
        return [Token.D0];
    }
    const sections = splitToSections(n);
    const tokenized = {
        yi: null, wan: null, yuan: null, jiao: null, fen: null
    };
    Object.keys(sections).map(s => tokenized[s] = parseTill10K(sections[s]));
    const ans = [];
    if (sections.yi > 0) {
        ans.splice(ans.length, 0, ...tokenized.yi);
        ans.push(Token.Yi);
    }
    if (needPrefixD0(sections.wan, [sections.yi,])) {
        ans.push(Token.D0);
    }
    if (sections.wan > 0) {
        ans.splice(ans.length, 0, ...tokenized.wan);
        ans.push(Token.Wan);
    }
    if (needPrefixD0(sections.yuan, [sections.yi, sections.wan,])) {
        ans.push(Token.D0);
    }
    if ([sections.yuan, sections.jiao, sections.fen].some(i => i > 0)) {
        ans.splice(ans.length, 0, ...tokenized.yuan);
    }
    if (sections.jiao > 0 || sections.fen > 0) {
        ans.push(Token.Dian);
        ans.splice(ans.length, 0, ...tokenized.jiao);
        if (sections.fen > 0) {
            ans.splice(ans.length, 0, ...tokenized.fen);
        }
    }
    return ans;
}
