'use client';

import { Button, Form, Input } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const filterGroups = (inputValue: string, path: DefaultOptionType[]) =>
  path.some(
    (option) =>
      (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) >
      -1
  );

export default function UserInformationsTab() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      {...layout}
      form={form}
      name='control-hooks'
      onFinish={onFinish}
      style={{ maxWidth: '100%' }}
      labelCol={{ style: { width: 200 } }}
      wrapperCol={{ style: { width: '100%' } }}
    >
      <Form.Item name='lastname' label='Nom' rules={[{ required: true }]}>
        <Input defaultValue='Alberto' />
      </Form.Item>
      <Form.Item name='firstname' label='Prénom' rules={[{ required: true }]}>
        <Input defaultValue='Roberto' />
      </Form.Item>
      <Form.Item
        name='mail'
        label='Adresse mail'
        rules={[{ required: true, type: 'email' }]}
      >
        <Input defaultValue='roberto.alberto@gmail.com' />
      </Form.Item>
      <Form.Item
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
        wrapperCol={{
          style: { margin: 'auto', marginTop: 'var(--spacing-24)' },
        }}
      >
        <Button type='primary' htmlType='submit'>
          Enregistrer les modifications
        </Button>
      </Form.Item>
    </Form>
  );
}
