<template>
  <Input type='tel' v-bind="$attrs" v-model="input" maxlength="10">
    <template slot="prepend">+7</template>
  </Input>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
// TODO: add|check tree shaking
import { Input } from 'element-ui';

import { ValidateResult } from '@/ts-declare/types/ValidateResult.d.ts';

// helper
function validate(value: string): ValidateResult<string> {
  const phone = value;
  let error = '';
  let valid = phone.length === 10;

  valid = valid && phone.match(/^[\d]{10}$/) !== null;

  if (!valid) {
    error = 'Неверный формат номера телефона. Допустимый формат: +7 ### ### ####';
  }
  return { value: phone, error, valid };
}

function format(value: string): string {
  let val = value;
  val = val.replace(/[^\d]/g, '');
  return val;
}

export function validator(rule: any, value: string, callback: any): void {
  const validation = validate(value);
  if (validation.valid) { return callback(); }
  return callback(new Error(validation.error));
}

@Component({
  name: 'field-phone',
  inheritAttrs: false,
  components: { Input }
})
export default class FieldPhone extends Vue {
  @Prop({ type: String, default: '' }) private readonly value!: string;

  private phone: string = format(this.value || '');

  get input(): string {
    return this.phone;
  }
  set input(raw: string) {
    this.phone = format(raw);
    this.$emit('input', this.phone);
  }
}
</script>