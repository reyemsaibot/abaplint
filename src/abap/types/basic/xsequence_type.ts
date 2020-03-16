import {AbstractType} from "./_abstract_type";

export class XSequenceType extends AbstractType {
  public toText() {
    return "```xsequence```";
  }

  public isGeneric() {
    return true;
  }
}