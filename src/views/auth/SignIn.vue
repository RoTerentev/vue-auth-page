<template>
  <Container direction='vertical'>
    <Header class='header'>
      <h1>Авторизация</h1>
    </Header>
    <Main>
      <Row type='flex' justify='center'>
        <Col :xs='24' :sm='16' :md='12' :lg='8' :xl='6'>
          <Form status-icon :model='form' :rules='valid' ref='form:auth'>
            <FormItem class='mb' label='Телефон' prop='phone'>
              <FieldPhone v-model='form.phone'/>
            </FormItem>
            <FormItem class='mb' label='Пароль' prop='password'>
              <FieldPassword v-model='form.password'/>
            </FormItem>
            <FormItem class='mt'>
              <Button type='primary' @click='submitForm'>Войти</Button>
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
  Col
} from 'element-ui';

import FieldPhone, {
  validator as phoneValidator
} from '@/components/form/fields/phone.vue';
import FieldPassword, {
  validator as passwordValidator
} from '@/components/form/fields/password.vue';

declare class AuthForm {
  phone: string;
  password: string;
}

@Component({
  name: 'register-view',
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
    Col
  }
})
export default class SingInView extends Vue {
  private form: AuthForm = {
    phone: '',
    password: ''
  };

  private valid = {
    phone: [{ required: true, validator: phoneValidator, trigger: 'change' }],
    password: [
      { required: true, validator: passwordValidator, trigger: 'change' }
    ]
  };

  public submitForm(): void {
    const form = this.$refs['form:auth'] as Form;
    form.validate((valid: boolean) => {
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
}
</script>
