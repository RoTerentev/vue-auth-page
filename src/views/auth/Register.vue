<template>
  <Container direction='vertical'>
    <Header class='header'>
      <h1>Регистрация</h1>
    </Header>
    <Main>
      <Row type='flex' justify='center'>
        <Col :xs='24' :sm='16' :md='12' :lg='8' :xl='6'>
          <Form status-icon :model='form' :rules='valid' ref='form:reg'>
            <FormItem class='mb' label='Имя' prop='fisrtName'>
              <FieldPersonName v-model='form.fisrtName'/>
            </FormItem>
            <FormItem class='mb' label='Фамилия' prop='middleName'>
              <FieldPersonName v-model='form.middleName'/>
            </FormItem>
            <FormItem class='mb' label='Отчество' prop='lastName'>
              <FieldPersonName v-model='form.lastName'/>
            </FormItem>
            <FormItem class='mb' label='Телефон' prop='phone'>
              <FieldPhone v-model='form.phone'/>
            </FormItem>
            <FormItem class='mb' label='Пароль' prop='password'>
              <FieldPassword v-model='form.password'/>
            </FormItem>
            <FormItem class='mt'>
              <Button type='primary' @click='submitForm'>Зарегистрироваться</Button>
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
  Col
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

@Component({
  name: 'sign-in-view',
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
    FieldPhone,
    FieldPassword,
    FieldPersonName
  }
})
export default class RegisterView extends Vue {
  private form = {
    fisrtName: '',
    middleName: '',
    lastName: '',
    phone: '',
    password: ''
  };

  private valid = {
    fisrtName: [{ required: true, validator: nameValidator, trigger: 'blur' }],
    middleName: [{ required: true, validator: nameValidator, trigger: 'blur' }],
    lastName: [{ required: false, validator: nameValidator, trigger: 'blur' }],
    phone: [{ required: true, validator: phoneValidator, trigger: 'blur' }],
    password: [
      { required: true, validator: passwordValidator, trigger: 'blur' }
    ]
  };

  public submitForm() {
    const form = this.$refs['form:reg'] as Form;
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