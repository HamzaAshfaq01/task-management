import * as Yup from "yup";

export const ValidateEmail = () => {


    const validate = {
        email: Yup.string()
            .email("The email provided should be a valid email address")
            .required("Please enter email"),
    };

    return validate;
}
