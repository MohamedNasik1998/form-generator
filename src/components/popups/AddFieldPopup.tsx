import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAllContext } from "../../contexts/AllContext";
import { faCheck, faChevronCircleDown, faMobile, faPen } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";
import { useState } from "react";
import Swal from "sweetalert2";

type Option = {
    label: string;
    value: boolean;
};

type FormField = {
    label: string;
    type: string;
    isRequired: boolean;
    value?: string;
    options?: Option[];
};

const AddFieldPopup: React.FC = () => {
    const { setShowAddField, setFormFields } = useAllContext();
    const [showEditFieldPopup, setShowEditFieldPopup] = useState<boolean>(false);
    const [fieldType, setFieldType] = useState<string>('');
    const [label, setLabel] = useState<string>('');
    const [optionsInput, setOptionsInput] = useState<string>('');
    const [options, setOptions] = useState<Option[]>([]);
    const [isRequired, setIsRequired] = useState<boolean>(false);

    const handleFieldTypeClick = (type: string) => {
        setFieldType(type);
        setShowEditFieldPopup(true);
    };

    const handleAddOption = () => {
        const [optLabel, optValueStr] = optionsInput.split(',').map(item => item.trim());
        const optValue = optValueStr === 'false';
        if (optLabel) {
            setOptions((prev) => [...prev, { label: optLabel, value: optValue }]);
            setOptionsInput('');
        }
    };

    const handleSaveField = () => {
        if (label) {
            const newField: FormField = { label, type: fieldType, value:'', isRequired };
            if (fieldType === 'checkbox' || fieldType === 'dropdown') {
                newField.options = options;
            }
            setFormFields((prev: FormField[]) => [...prev, newField]);

            setFieldType('');
            setLabel('');
            setOptionsInput('');
            setOptions([]);
            setIsRequired(false);
            setShowEditFieldPopup(false);
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Label can't be empty!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };


    const closeEditFieldPopup = () => {
        setFieldType('');
        setLabel('');
        setOptionsInput('')
        setOptions([]);
        setShowEditFieldPopup(false);
    }

    return (
        <>
            {/* Main Popup with Buttons */}
            {!showEditFieldPopup && (
                <div className="hs-overlay flex items-center size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto bg-black bg-opacity-10 pointer-events-auto">
                    <div className="shadow-2xl hs-overlay-open:mt-7 hs-overlay-open:opacity-100 mt-0 ease-out sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                        <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-4">Add New Field</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    <button onClick={() => handleFieldTypeClick('text')} className="text-sm border bg-gray-100 text-gray-700 shadow-md rounded-md px-5 h-10 p-2 hover:shadow-lg">
                                        <FontAwesomeIcon icon={faPen} className="mr-2" /> Short Text
                                    </button>
                                    <button onClick={() => handleFieldTypeClick('email')} className="text-sm border bg-gray-100 text-gray-700 shadow-md rounded-md px-5 h-10 p-2 hover:shadow-lg">
                                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Email
                                    </button>
                                    <button onClick={() => handleFieldTypeClick('password')} className="text-sm border bg-gray-100 text-gray-700 shadow-md rounded-md px-5 h-10 p-2 hover:shadow-lg">
                                        <FontAwesomeIcon icon={faKey} className="mr-2" /> Password
                                    </button>
                                    <button onClick={() => handleFieldTypeClick('tel')} className="text-sm border bg-gray-100 text-gray-700 shadow-md rounded-md px-5 h-10 p-2 hover:shadow-lg">
                                        <FontAwesomeIcon icon={faMobile} className="mr-2" /> Mobile No
                                    </button>
                                    <button onClick={() => handleFieldTypeClick('checkbox')} className="text-sm border bg-gray-100 text-gray-700 shadow-md rounded-md px-5 h-10 p-2 hover:shadow-lg">
                                        <FontAwesomeIcon icon={faCheck} className="mr-2" /> Multiple
                                    </button>
                                    <button onClick={() => handleFieldTypeClick('dropdown')} className="text-sm border bg-gray-100 text-gray-700 shadow-md rounded-md px-5 h-10 p-2 hover:shadow-lg">
                                        <FontAwesomeIcon icon={faChevronCircleDown} className="mr-2" /> Dropdown
                                    </button>
                                </div>
                                <div className="sticky bottom-0 flex gap-3 float-right mt-4">
                                    <button
                                        className="flex border bg-gray-200 text-gray-700 shadow-md rounded-md px-5 h-10 p-2 hover:shadow-lg"
                                        onClick={() => setShowAddField(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Dynamic Popup for Entering Field Values */}
            {showEditFieldPopup && (
                <div className="hs-overlay flex items-center size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto bg-black bg-opacity-10 pointer-events-auto">
                    <div className="shadow-2xl hs-overlay-open:mt-7 hs-overlay-open:opacity-100 mt-0 ease-out sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                        <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-4">Enter Field Values</h2>
                                <label className="block mb-2">
                                    Label:
                                    <input
                                        type="text"
                                        value={label}
                                        onChange={(e) => setLabel(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    />
                                </label>

                                <label className="block mb-2 flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={isRequired}
                                        onChange={(e) => setIsRequired(e.target.checked)}
                                        className="mr-2"
                                    />
                                    Required Field
                                </label>

                                {(fieldType === 'checkbox' || fieldType === 'dropdown') && (
                                    <>
                                        <label className="block mb-2">
                                            Options (format: label):
                                            <input
                                                type="text"
                                                value={optionsInput}
                                                onChange={(e) => setOptionsInput(e.target.value)}
                                                placeholder="Option1"
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </label>
                                        <button
                                            className="flex border bg-blue-500 text-white shadow-md rounded-md px-5 h-10 p-2 hover:bg-blue-600"
                                            onClick={handleAddOption}
                                        >
                                            Add Option
                                        </button>

                                        <ul className="mt-2">
                                            {options.map((opt, index) => (
                                                <li key={index}>
                                                    {index + 1} - {opt.label}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                <div className="sticky bottom-0 flex gap-3 float-right mt-4">
                                    <button
                                        className="flex border bg-gray-200 text-gray-700 shadow-md rounded-md px-5 h-10 hover:shadow-lg flex items-center"
                                        onClick={() => closeEditFieldPopup()}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="flex border bg-blue-500 text-white shadow-md rounded-md px-5 h-10 hover:bg-blue-600 flex items-center"
                                        onClick={handleSaveField}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddFieldPopup;