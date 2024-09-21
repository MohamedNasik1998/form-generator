import { useAllContext } from "../../contexts/AllContext";
import { FormField } from "../../models/FormModel";

export const SubmitScreen = () => {
    const { setIsSubmitted, setCurrentPage, setFormFields } = useAllContext();
    const resetForm = () => {
        setIsSubmitted(false);
        setCurrentPage(0);

        setFormFields((prevFields: FormField[]) =>
            prevFields.map((field) => ({
                ...field,
                value: "",
                options: field.type === "checkbox"
                    ? field.options?.map(option => ({ ...option, value: false }))
                    : field.options
                
            }))
        );
    }

    return (
        <div className="p-4 w-full md:h-[90vh] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold">You're done!</h2>
            <p>Your form is saved successfully!</p>
            <div className="flex justify-between mt-4">
                <button
                    onClick={resetForm}
                    className="bg-blue-500 text-white px-9 py-2 rounded hover:bg-blue-600"
                >
                    Fill Again
                </button>
            </div>
        </div>
    );
};