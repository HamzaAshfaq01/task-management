import * as Yup from "yup";

export const ValidateBirthDate = () => {


    const validate = {
        birth_date: Yup.string()
            .required("The due date is requireded"),
    };

    return validate;
}
