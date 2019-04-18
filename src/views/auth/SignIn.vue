<template>
  <Container direction='vertical'>
    <Header class='header'>
      <h1>Авторизация</h1>
    </Header>
    <Main>
      <Row type='flex' justify='center'>
        <Col :xs='24' :sm='16' :md='12' :lg='8' :xl='6'>
          <Form status-icon :model='form' :rules='validateRules' @keyup.enter.prevent.native="submitForm" ref='form:auth'>
            <FormItem class='mb' label='Телефон' prop='phone'>
              <FieldPhone v-model='form.phone'/>
            </FormItem>
            <FormItem class='mb' label='Пароль' prop='password'>
              <FieldPassword v-model='form.password'/>
            </FormItem>
            <FormItem class='mt'>
              <Alert v-if="alert.msg !== ''" center  :type="alert.type" :closable="alert.close" style="margin-bottom: 20px;">
                <template slot="title">
                  <span class="fz16">{{ alert.title }}</span>
                </template>
                <template slot="default">
                  <span class="fz16">{{ alert.msg }}</span>
                </template>
              </Alert>
              <Button type='primary' @click.prevent.native='submitForm' :loading="isAuthProcessing" :disabled="isLogin">Войти</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Main>
    <Footer class='footer'>
      <router-link to='/register'>Регистрация</router-link>
    </Footer>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// TODO: add|check tree shaking
import {
  Button,
  Form,
  FormItem,
  Main,
  Footer,
  Header,
  Container,
  Row,
  Col,
  Alert
} from 'element-ui';

import { Action, namespace } from 'vuex-class';

import FieldPhone, {
  validator as phoneValidator
} from '@/components/form/fields/phone.vue';
import FieldPassword, {
  validator as passwordValidator
} from '@/components/form/fields/password.vue';

import { Person } from '@/ts-declare/classes/Person';
import { AuthCredentials } from '@/ts-declare/types/AuthCredentials';
import fullname from '@/utils/fullname';

const AuthStore = namespace('auth');

@Component({
  name: 'sign-in-view',
  components: {
    Button,
    Form,
    FormItem,
    FieldPhone,
    FieldPassword,
    Header,
    Main,
    Footer,
    Container,
    Row,
    Col,
    Alert
  }
})
export default class SingInView extends Vue {

  public get alert(): {title: string, msg: string, type: string, close: boolean } {
    if (this.authError && this.authError !== '') {
      return {title: 'Ошибка', msg: this.authError, type: 'error', close: true};
    }

    if (this.isLogin) {
      return {title: 'Вы вошли под номером', msg: this.prettyPhone, type: 'success', close: false};
    }

    if (this.$route.query.new && this.person) {
      return {title: 'Вы зарегистрировались', msg: `под номером ${this.prettyPhone}, как ${fullname(this.person)}`, type: 'info', close: false};
    }

    return {title: '', msg: '', type: '',  close: true};
  }

  public form: AuthCredentials = {
    phone: '',
    password: ''
  };

  public validateRules = {
    phone: [{ required: true, validator: phoneValidator, trigger: 'change' }],
    password: [
      { required: true, validator: passwordValidator, trigger: 'change' }
    ]
  };
  @AuthStore.State((state) => state.person)
  private readonly person!: Person | null;

  @AuthStore.State((state) => state.isProcessing)
  private readonly isAuthProcessing!: boolean;

  @AuthStore.State((state) => state.error)
  private readonly authError!: string;

  @AuthStore.Getter('isLogin')
  private readonly isLogin!: boolean;

  @AuthStore.Getter('prettyPhone')
  private readonly prettyPhone!: string;

  @AuthStore.Action
  private signIn!: (arg: AuthCredentials) => void;

  public submitForm(): void {
    const form = this.$refs['form:auth'] as Form;
    form.validate((valid: boolean) => {
      if (valid) {
        // TODO: refactoring for phone prefix logic
        const formData: AuthCredentials = {password: this.form.password, phone: `+7${this.form.phone}`};
        this.signIn(formData);
      }
      return false;
    });
  }

}
</script>
