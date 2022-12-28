import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useAuth } from '../authentication/provider/AuthContext';
import { CustomTextInput } from './formik-primitives';
import * as Yup from "yup"
// chakra components


const initialValues = {
    email: "",
    password: "",
}
const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
})

/* const validationSchema = Yup.object() */
const SignIn= () => {
    // const { signIn } = useAuth()! || {};
    const toast = useToast();

    return (
        <Flex>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={async (values) => {
                    signIn(values.email, values.password, toast);
                }}
            >
                {({
                    handleSubmit,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    values,
                }) => (
                    <Form>
                        <Box>
                            <CustomTextInput
                                id="email"
                                label="Email Address"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.email}
                                // touched={touched.email!}
                                placeholder="email"
                            />

                            <CustomTextInput
                                id="password"
                                label="Password"
                                value={values.password}
                                type={"password"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.password}
                                // touched={touched.password!}
                                placeholder="password"
                            />
                            <Flex justifyContent={"center"}>
                                <Button type={"submit"} width={["150px", "200px"]} variant={"action"}>Continue</Button>
                            </Flex>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Flex>
    )
}


export default SignIn;