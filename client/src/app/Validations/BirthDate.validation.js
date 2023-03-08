import * as Yup from "yup";

export const ValidateBirthDate = () => {


    const validate = {
        birth_date: Yup.string()
            .required("The birth date is requireded"),
    };

    return validate;
}
