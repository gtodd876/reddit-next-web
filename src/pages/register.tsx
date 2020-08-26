import { Formik, Form } from 'formik';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
} from '@chakra-ui/core';

interface RegisterProps {}

export default function register() {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={values => console.log(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              label="Username"
              placeholder="username"
            />
            <InputField
              name="password"
              label="Password"
              placeholder="password"
              type="password"
            />
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
