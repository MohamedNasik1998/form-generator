import { useAllContext } from "../../contexts/AllContext";

const WelcomePopup: React.FC = ({ }) => {
    const { welcomeScreenTitle, setWelcomeScreenTitle, welcomeScreenDescription, setWelcomeScreenDescription, setShowWelcomePopup } = useAllContext();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWelcomeScreenTitle(event.target.value);
    };
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWelcomeScreenDescription(event.target.value);
    };
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-10 pointer-events-auto ">
            <div className="w-full max-w-md p-6 bg-white rounded-lg border-2 border-gray-300 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Welcome Screen</h2>

                </div>
                <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-4 mb-4 overflow-x-hidden scrollbar-thin hover:scrollbar-thumb-gray-600 scrollbar-track-transparent ">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="welcome_screen_title"
                            id="welcome_screen_title"
                            value={welcomeScreenTitle}
                            onChange={handleTitleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <input
                            type="text"
                            name="welcome_screen_des"
                            id="welcome_screen_des"
                            value={welcomeScreenDescription}
                            onChange={handleDescriptionChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                </div>
                <div className="sticky bottom-0 flex gap-3 float-right">
                    <button
                        className="flex border bg-gray-200 text-gray-700 shadow-md rounded-md px-5 h-10 p-2 hover:shadow-lg"
                        onClick={() => setShowWelcomePopup(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WelcomePopup
