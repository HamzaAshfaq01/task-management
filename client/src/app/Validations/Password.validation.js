import * as Yup from "yup";

export const ValidatePasswordSignIn = () => {


    const validate = {
        password: Yup.string()
            .required("Please enter password"),
    };

    return validate;
}

export const ValidatePassword = () => {


    const validate = {
        password: Yup.string()
            .required("Please enter password"),
    };

    return validate;
}

export const ValidateOldPassword = () => {


    const validate = {
        old_password: Yup.string()
            // .matches(
            //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^@$!%*#?&_-])[A-Za-z\d][^@$!%*#?&_-]{8,}$/,
            //     t("CONFIRM_PASSWORD_CARACTERS")
            // )
            .max(20)
            .required("Please enter old password"),
    };

    return validate;
}

export const ValidateNewPassword = () => {


    const validate = {
        new_password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]?)[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain 8 characters, one uppercase, one lowercase, one number"
            )
            .max(20)
            .required("Please enter new password"),
    };

    return validate;
}

export const ValidateConfirmNewPassword = () => {


    const validate = {
        confirm_new_password: Yup.string()
            .oneOf(
                [Yup.ref("new_password")],
                "Both password fields need to be the same"
            )
            .required("Please enter confirm new password"),
    };

    return validate;
}
