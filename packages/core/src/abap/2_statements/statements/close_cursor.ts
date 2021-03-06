import {IStatement} from "./_statement";
import {verNot, str, seq} from "../combi";
import {SQLSource} from "../expressions";
import {Version} from "../../../version";
import {IStatementRunnable} from "../statement_runnable";

export class CloseCursor implements IStatement {

  public getMatcher(): IStatementRunnable {
    const ret = seq(str("CLOSE CURSOR"), new SQLSource());
    return verNot(Version.Cloud, ret);
  }

}