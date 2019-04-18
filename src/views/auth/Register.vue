<template>
  <Container direction='vertical'>
    <Header class='header'>
      <h1>Регистрация</h1>
    </Header>
    <Main>
      <Row type='flex' justify='center'>
        <Col :xs='24' :sm='16' :md='12' :lg='8' :xl='6'>
          <Form status-icon :model='form' :rules='validateRules' @keyup.enter.prevent.native="submitForm" ref='form:reg'>
            <FormItem class='mb' label='Имя' prop='firstName'>
              <FieldPersonName v-model='form.firstName'/>
            </FormItem>
            <FormItem class='mb' label='Фамилия' prop='lastName'>
              <FieldPersonName v-model='form.lastName'/>
            </FormItem>
            <FormItem class='mb' label='Отчество' prop='middleName'>
              <FieldPersonName v-model='form.middleName'/>
            </FormItem>
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
              <Button type='primary' :loading="isAuthProcessing"  @click.prevent.native='submitForm'>Зарегистрироваться</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Main>
    <Footer class='footer'>
      <router-link to='/auth'>Вход</router-link>
    </Footer>
  </Container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
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

import FieldPhone, {
  validator as phoneValidator
} from '@/components/form/fields/phone.vue';
import FieldPassword, {
  validator as passwordValidator
} from '@/components/form/fields/password.vue';
import FieldPersonName, {
  validator as nameValidator
} from '@/components/form/fields/person-name.vue';

import { Action, namespace } from 'vuex-class';

const AuthStore = namespace('auth');

import { RegisterCredentials } from '@/ts-declare/types/RegisterCredentials';
import fullname from '@/utils/fullname';
import prettyPhone from '@/utils/pretty-phone';

@Component({
  name: 'register-view',
  components: {
    Button,
    Form,
    FormItem,
    Main,
    Footer,
    Header,
    Container,
    Row,
    Col,
    Alert,
    FieldPhone,
    FieldPassword,
    FieldPersonName
  }
})
export default class RegisterView extends Vue {
  @AuthStore.State((state) => state.error)
  private readonly authError!: string;
  @AuthStore.State((state) => state.isProcessing)
  private readonly isAuthProcessing!: boolean;
  @AuthStore.Getter
  private readonly isLogin!: boolean;
  @AuthStore.Action
  private signUp!: (arg: RegisterCredentials) => Promise<void>;

  private form: RegisterCredentials = {
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    password: ''
  };

  private validateRules = {
    firstName: [{ required: true, validator: nameValidator, trigger: 'blur' }],
    middleName: [{ required: false, validator: nameValidator, trigger: 'blur' }],
    lastName: [{ required: true, validator: nameValidator, trigger: 'blur' }],
    phone: [{ required: true, validator: phoneValidator, trigger: 'blur' }],
    password: [
      { required: true, validator: passwordValidator, trigger: 'blur' }
    ]
  };


  public get alert(): {title: string, msg: string, type: string, close: boolean } {
    if (this.authError && this.authError !== '') {
      return {title: 'Ошибка', msg: this.authError, type: 'error', close: true};
    }

    if (this.regAnnotation) {
      return {title: 'Вы пытаетесь зарегистрироваться', msg: this.regAnnotation, type: 'info', close: false};
    }

    return {title: '', msg: '', type: '',  close: true};
  }


  public get regAnnotation(): string {

    const msg: string[] = [];
    const name = fullname(this.form);
    const phone = this.form.phone && `+7${this.form.phone}`;

    if (phone !== '') {
      msg.push(`под номером ${prettyPhone(phone)}`);
    }
    if (name !== '') {
      msg.push(`как ${name}`);
    }

    if (msg.length) {
      return msg.join(', ');
    }
    return '';
  }

  public submitForm() {
    const form = this.$refs['form:reg'] as Form;
    form.validate((valid: boolean) => {
      if (valid) {
        // TODO: refactoring for phone prefix logic
        const formData: RegisterCredentials = Object.assign({}, this.form, { phone: `+7${this.form.phone}` });
        this.signUp(formData)
        .then(() => {
          this.$router.push({ path: '/auth', query: { new: '1' } });
        })
        .catch(() => null);
      }
      return false;
    });
  }
}
</script>