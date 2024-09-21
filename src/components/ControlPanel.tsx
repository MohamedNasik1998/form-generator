import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAllContext } from "../contexts/AllContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FormField } from "../models/FormModel";

const ControlPanel: React.FC = ({ }) => {
    const { setShowWelcomePopup, setShowNameInput, setShowEmailInput, setShowAddField, formFields, setFormFields, setCurrentPage } = useAllContext();

    const handleButtonClick = (action: string) => {
        switch (action) {
            case 'welcome':
                setShowWelcomePopup(true);
                setShowNameInput(false);
                setShowEmailInput(false);
                setShowAddField(false);
                break;
            case 'name':
                setShowWelcomePopup(false);
                setShowNameInput(true);
                setShowEmailInput(false);
                setShowAddField(false);
                break;
            case 'email':
                setShowWelcomePopup(false);
                setShowNameInput(false);
                setShowEmailInput(true);
                setShowAddField(false);
                break;
            case 'addField':
                setShowWelcomePopup(false);
                setShowNameInput(false);
                setShowEmailInput(false);
                setShowAddField(true);
                break;
            default:
                break;
        }
    };

    const handleDeleteField = (index: number) => {
        setFormFields((prev) => prev.filter((_, i) => i !== index));
    };
    const handleStart = () => {
        setCurrentPage(0);
    };

    return (
        <div className="p-3 mr-3">
            <h4 className="mb-2">Steps</h4>
            <button
                className="block w-full bg-gray-100 hover:bg-gray-200 rounded-lg px-2 py-2 my-3"
                onClick={() => handleButtonClick('welcome')}
            >
                Welcome Screen
            </button>

            <button
                className="block w-full bg-gray-100 hover:bg-gray-200 rounded-lg px-2 py-2 my-3"
                onClick={() => handleButtonClick('name')}
            >
                Enter Your Name
            </button>

            <button
                className="block w-full bg-gray-100 hover:bg-gray-200 rounded-lg px-2 py-2 my-3"
                onClick={() => handleButtonClick('email')}
            >
                Enter Your Email
            </button>

            <div className="flex justify-between">
                <button
                    className="w-1/2 bg-gray-200 hover:bg-gray-300 rounded-lg px-7 py-2 my-3 mr-2"
                    onClick={() => handleButtonClick('addField')}
                >
                    Add Field
                </button>
                <button
                    className="w-1/2 bg-gray-200 hover:bg-gray-300 rounded-lg px-7 py-2 my-3"
                    onClick={() => handleStart()}
                >
                    Start
                </button>
            </div>

            <hr className="border-t-2 border-gray-300 my-4" />
            <div>
                <button
                    className="block w-full bg-gray-100 hover:bg-gray-200 rounded-lg px-2 py-2 my-3 flex justify-center items-center"
                    onClick={() => handleStart()}
                >
                    <span>Welcome Screen </span>
                </button>

                {formFields.map((item: FormField, index: number) => (
                    <button
                        key={index}
                        className="block w-full bg-gray-100 hover:bg-gray-200 rounded-lg px-2 py-2 my-3 flex justify-between items-center"
                    >
                        <span>{item.label.length > 8 ? `${item.label.slice(0, 6)}...` : item.label} </span>
                        <span>
                            {item.type}
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="text-red-600 cursor-pointer ml-3"
                                onClick={() => handleDeleteField(index)}
                            />
                        </span>

                    </button>
                ))}
            </div>
        </div>
    )
}

export default ControlPanel