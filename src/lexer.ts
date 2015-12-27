import { Token } from "./tokens/tokens";
import File from "./file";

export default class Lexer {
    private tokens: Array<Token> = [];

    constructor(private file: File) {
        this.run();
    }

    private run() {
        this.to_tokens();
        this.split_punctuation(".");
        this.split_punctuation(",");
        this.split_punctuation(":");
        this.handle_strings();
        this.handle_comments();

        this.file.set_tokens(this.tokens);
    }

    private handle_comments() {
/*        let result: Array<Token> = [];

        for (let token of this.tokens) {
            let str = token.get_str();
            if (str.substr(0, 1) === "*") {
                token.set_str(str.substr(0, str.length - 1));
                result.push(dot);
            } else {
                result.push(token);
            }
        }
        this.tokens = result;
*/
    }

    private split_punctuation(char: string) {
        let result: Array<Token> = [];

        for (let token of this.tokens) {
            let str = token.get_str();
            if (str.substr(str.length - 1) === char) {
                token.set_str(str.substr(0, str.length - 1));
                result.push(token);
                let dot = new Token(token.get_row(), token.get_col() + str.length - 1, char);
                result.push(dot);
            } else {
                result.push(token);
            }
        }
        this.tokens = result;
    }

    private to_tokens() {
        let lines = this.file.get_raw().split("\n");

        for (let row = 0; row < lines.length; row++) {
            let tokens = lines[row].split(" ");
            let col = 0;
            for (let key in tokens) {
                if (tokens[key].length > 0) {
                    let token = new Token(row + 1, col, tokens[key]);
                    this.tokens.push(token);
                }
                col = col + tokens[key].length + 1;
            }
        }
    }

    private check_ok_string(str: string): boolean {
        str = str.replace(/''/g, "");

        let start = str.substr(0, 1);
        let end = str.substr(str.length - 1);
        if (start === "'") {
            if (end === "'") {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    private handle_strings() {
        let result: Array<Token> = [];
        let add: Token;

        for (let token of this.tokens) {
            if (add === undefined) {
                add = token;
            } else {
                add.set_str(add.get_str() + " " + token.get_str());
            }
            if (this.check_ok_string(add.get_str())) {
                result.push(add);
                add = undefined;
            }
        }
        this.tokens = result;
    }

}