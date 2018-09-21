import {seq, str, alt, tok, Reuse, IRunnable} from "../combi";
import {ParenLeft, ParenRight, ParenRightW} from "../tokens/";
import {Field} from "./";

export class PassByReference extends Reuse {
  public get_runnable(): IRunnable {
    let value = seq(str("REFERENCE"),
                    tok(ParenLeft),
                    new Field(),
                    alt(tok(ParenRight), tok(ParenRightW)));

    return value;
  }
}