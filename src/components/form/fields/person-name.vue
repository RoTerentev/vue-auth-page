<template>
  <Input type='text' v-bind='$attrs' v-model='input' maxlength='15'/>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// TODO: add|check tree shaking
import { Input } from "element-ui";

import { ValidateResult } from "@/ts-declare/types/ValidateResult.d.ts";

// helper
function validate(value: string): ValidateResult<string> {
  const name = value;
  let error = "";
  let valid = name.length > 0;

  valid = valid && name.match(/^[А-Яа-яЁё]+$/) !== null;

  if (!valid) {
    error = "Допустимы только буквы русского алфавита";
  }
  return { value: name, error, valid };
}

function format(value: string): string {
  // nonCyrillic with unicode /[^\u0410-\u044F\u0401\u0451]/g;
  const nonCyrillic = /[^А-Яа-яЁё]/g;
  const formatedStr = value.replace(nonCyrillic, "");
  return formatedStr;
}

export function validator(rule: any, value: string, callback: any): void {
  if (rule.required === false && value === "") return callback();
  const validation = validate(value);
  if (validation.valid) {
    return callback();
  }
  return callback(new Error(validation.error));
}

@Component({
  name: "field-person-name",
  inheritAttrs: false,
  components: { Input }
})
export default class FieldPersonName extends Vue {
  @Prop({ type: String, default: "" }) private readonly value!: string;

  private name: string = "";

  get input(): string {
    return this.name;
  }
  set input(raw: string) {
    this.name = format(raw);
    this.$emit("input", this.name);
  }
}
</script>