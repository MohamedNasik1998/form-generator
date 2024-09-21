import { useAllContext } from "../../contexts/AllContext";

const NameInputPopup: React.FC = () => {
    const { nameInput, setNameInput, setShowNameInput } = useAllContext();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameInput(event.target.value);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-10 pointer-events-auto">
            <div className="w-full max-w-md p-6 bg-white rounded-lg border-2 border-gray-300 shadow-2xl">
                <h2 className="text-lg font-semibold mb-4">Enter Your Name</h2>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name_input"
                        id="name_input"
                        value={nameInput}
                        onChange={handleNameChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="sticky bottom-0 flex gap-3 float-right mt-4">
                    <button
                        className="flex border bg-gray-200 text-gray-700 shadow-md rounded-md px-5 h-10 p-2 hover:shadow-lg"
                        onClick={() => setShowNameInput(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NameInputPopup;
