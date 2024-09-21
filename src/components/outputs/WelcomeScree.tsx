import { useAllContext } from "../../contexts/AllContext";

export const WelcomeScreen = () => {
    const { welcomeScreenTitle, welcomeScreenDescription, nameInput, emailInput } = useAllContext();

    return (
        <div className="p-4 w-full md:h-[90vh] flex flex-col items-center justify-center ">
            {welcomeScreenTitle && (
                <h1 className="text-4xl font-bold text-gray-800">{welcomeScreenTitle}</h1>
            )}
            {welcomeScreenDescription && (
                <p className="mt-4 text-lg text-gray-700">{welcomeScreenDescription}</p>
            )}

            <div className="absolute bottom-5 left-5 mb-4 ml-4">
                {(nameInput || emailInput) && (
                    <div className="mt-6 space-y-4 text-lg">
                        {nameInput && (
                            <div className="flex items-center">
                                <span className="font-semibold">Name: </span>
                                <span className="ml-2 text-gray-800">{nameInput}</span>
                            </div>
                        )}
                        {emailInput && (
                            <div className="flex items-center">
                                <span className="font-semibold">Email: </span>
                                <span className="ml-2 text-gray-800">{emailInput}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};