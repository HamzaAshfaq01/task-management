/* eslint-disable no-useless-concat */
import * as Yup from "yup";

export const ValidateLastName = () => {
    const validate = {
        last_name: Yup.string()
            .min(1, "Last name" + "Must have at least 2 characters")
            .matches(
                /^[^\s]([(ก-๏)|(a-zA-Z)\s]+)[^\s]$/,
                "Last name" + "Must contain the characters A-Z a-z must not have spaces in front and behind."
            )
            .required("Please enter last name"),
    };

    return validate;
}
