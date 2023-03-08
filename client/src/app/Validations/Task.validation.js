import * as Yup from "yup";

export const ValidateTitle = () => {
    const validate = {
        title: Yup.string()
            .required("The title is required"),
    };
    return validate;
}
export const ValidateDescription = () => {
    const validate = {
        description: Yup.string()
            .required("The description is required"),
    };
    return validate;
}
export const ValidateDueDate = () => {
    const validate = {
        due_date: Yup.string()
            .required("The due date is required"),
    };
    return validate;
}




