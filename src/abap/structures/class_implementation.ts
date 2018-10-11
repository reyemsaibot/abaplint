import * as Statements from "../statements";
import {Structure} from "./_structure";
import * as Structures from "./";
import {star, IStructureRunnable, sta, beginEnd} from "./_combi";

export class ClassImplementation extends Structure {

  public getMatcher(): IStructureRunnable {
    let method = beginEnd(sta(Statements.Method),
                          new Structures.NormalClass(),
                          sta(Statements.Endmethod));

    let body = star(method);

    return beginEnd(sta(Statements.ClassImplementation),
                    body,
                    sta(Statements.EndClass));
  }

}