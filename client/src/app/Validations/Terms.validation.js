import * as Yup from "yup";

export const ValidateTerms = () => {


    const validate = {
        terms: Yup.boolean().oneOf(
            [true],
            "You must agree to our terms and conditions"
        ),
    };

    return validate;
}