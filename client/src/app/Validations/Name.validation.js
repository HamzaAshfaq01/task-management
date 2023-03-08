/* eslint-disable no-useless-concat */
import * as Yup from "yup";

export const ValidateName = () => {

    const validate = {
        first_name: Yup.string()
            .min(2, "Name" + "Must have at least 3 characters")
            .matches(
                /^[^\s]([(ก-๏)|(a-zA-Z)\s]+)[^\s]$/,
                "Name" + "Must contain the characters A-Z a-z must not have spaces in front and behind."
            )
            .required("Please enter name")
    };

    return validate;
}
