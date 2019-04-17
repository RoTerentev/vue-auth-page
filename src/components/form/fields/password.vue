<template>
  <Input type='password' v-bind="$attrs" minlength="8" v-model="input" show-password/>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
// TODO: add|check tree shaking
import { Input } from 'element-ui';

import { ValidateResult } from '@/ts-declare/types/ValidateResult.d.ts';

// helper
function validate(value: string): ValidateResult<string> {
  const pass = value;
  let error = '';
  let valid = pass.length >= 8;

  const lettersCapital = /[A-ZА-ЯЁ]/g;
  const lettersSmall = /[a-zа-яё]/g;

  valid = valid && pass.match(lettersCapital) !== null;
  valid = valid && pass.match(lettersSmall) !== null;
  valid = valid && pass.match(/[\d]/g) !== null;

  if (!valid) {
    error = 'Пароль должен содержать не менее 8 символов. Обязательные символы: цифры, заглавные и строчные буквы';
  }
  return { value: pass, error, valid };
}

export function validator(rule: any, value: string, callback: any): void {
  const validation = validate(value);
  if (validation.valid) { return callback(); }
  return callback(new Error(validation.error));
}

@Component({
  name: 'field-password',
  inheritAttrs: false,
  components: { Input }
})
export default class FieldPassword extends Vue {
  @Prop({ type: String, default: '' }) private readonly value!: string;

  private password: string = '';

  get input(): string {
    return this.password;
  }
  set input(raw: string) {
    this.password = raw;
    this.$emit('input', raw);
  }
}
</script>