import { motion, AnimatePresence } from "framer-motion";
import { useAllContext } from "../../contexts/AllContext";
import { WelcomeScreen } from "./WelcomeScree";
import { FormFieldPage } from "./FormFieldPage";
import { SubmitScreen } from "./SubmitScreen";

const SlideForm = () => {
    const { formFields, isSubmitted, setIsSubmitted, currentPage, setCurrentPage } = useAllContext();

    // Handle Next and Previous
    const nextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log("Form submitted with data:", formFields);
        setIsSubmitted(true);
    };

    // Framer-motion transition settings
    const variants = {
        enter: { opacity: 0, x: 20 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
    };

    return (
        <div className="relative">
            <AnimatePresence>
                <motion.div
                    key={currentPage}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={variants}
                    transition={{ duration: 0.5 }}
                    className="absolute w-full"
                >
                    {currentPage === 0 && !isSubmitted && <WelcomeScreen />}

                    {/* Adjust the range to properly render the form fields */}
                    {currentPage > 0 && currentPage <= formFields.length && !isSubmitted &&  (
                        <FormFieldPage formField={formFields[currentPage - 1]} index={currentPage-1} />
                    )}

                    {/* Show Submit Screen if the form is submitted */}
                    {isSubmitted && <SubmitScreen />}

                    {/* Navigation Buttons */}
                    {formFields.length > 0 && !isSubmitted && (
                        <div className="flex justify-between absolute bottom-[-30px] right-5 mb-4 ml-4">
                            {currentPage > 0 && (
                                <button
                                    onClick={prevPage}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Previous
                                </button>
                            )}
                            {currentPage < formFields.length && (
                                <button
                                    onClick={nextPage}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-3"
                                >
                                    Next
                                </button>
                            )}

                            {currentPage === formFields.length && formFields.length !== 0 && (
                                <button
                                    onClick={handleSubmit}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-3"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

        </div>
    );
};

export default SlideForm;