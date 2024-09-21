import { useAllContext } from '../contexts/AllContext'
import ControlPanel from './ControlPanel'
import SlideForm from './outputs/SliderForm';
import AddFieldPopup from './popups/AddFieldPopup';
import NameInputPopup from './popups/EmailInputPopup';
import EmailInputPopup from './popups/NameInputPopup';
import WelcomePopup from './popups/WelcomePopup'

const Dashboard = () => {
    const { showWelcomePopup, showNameInput, showEmailInput, showAddField } = useAllContext();
    return (
        <>
            {showWelcomePopup && <WelcomePopup />}
            {showNameInput && <EmailInputPopup />}
            {showEmailInput && <NameInputPopup />}
            {showAddField && <AddFieldPopup />}

            <div className="w-full md:h-screen p-5 flex bg-gradient-to-b from-gray-100 to-gray-500">
                <div className="w-full md:w-1/5 h-full overflow-y-auto">
                    <ControlPanel />
                </div>
                <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-100 to-blue-200 rounded-lg shadow-2xl p-3">
                    <SlideForm />
                </div>
            </div>

        </>
    )
}

export default Dashboard
