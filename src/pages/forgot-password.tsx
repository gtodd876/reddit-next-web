import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import Wrapper from '../components/Wrapper';
import { Formik, Form } from 'formik';
import login from './login';
import { toErrorMap } from '../utils/toErrorMap';
import InputField from '../components/InputField';
import { Box, Flex, Link, Button } from '@chakra-ui/core';
import { useForgotPasswordMutation } from '../generated/graphql';
import { useState } from 'react';

function ForgotPassword({}) {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async values => {
          if (values.email) {
            values.email = values.email.trim();
          }
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if an account with that email exists then we have sent you an
              email
            </Box>
          ) : (
            <Form>
              <InputField name="email" label="Email" placeholder="email" />
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                email link
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);
