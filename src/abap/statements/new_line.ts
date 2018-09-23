import {Statement} from "./statement";
import {verNot, str, seq, opt, alt, IRunnable} from "../combi";
import {Version} from "../../version";

export class NewLine extends Statement {

  public static get_matcher(): IRunnable {
    let ret = seq(str("NEW-LINE"),
                  opt(alt(str("SCROLLING"), str("NO-SCROLLING"))));

    return verNot(Version.Cloud, ret);
  }

}