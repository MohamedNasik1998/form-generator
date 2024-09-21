import { createContext, useState, useContext } from "react";
import { FormField } from "../models/FormModel";


type ContextType = {
  showWelcomePopup: boolean;
  setShowWelcomePopup: (value: boolean) => void;
  showNameInput: boolean;
  setShowNameInput: (value: boolean) => void;
  showEmailInput: boolean;
  setShowEmailInput: (value: boolean) => void;
  showAddField: boolean;
  setShowAddField: (value: boolean) => void;

  welcomeScreenTitle: string;
  setWelcomeScreenTitle: (value: string) => void;
  welcomeScreenDescription: string;
  setWelcomeScreenDescription: (value: string) => void;

  nameInput: string;
  setNameInput: (value: string) => void;
  emailInput: string;
  setEmailInput: (value: string) => void;

  formFields: FormField[],
  setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

};

const defaultContext: ContextType = {
  showWelcomePopup: false,
  setShowWelcomePopup: () => { },
  showNameInput: false,
  setShowNameInput: () => { },
  showEmailInput: false,
  setShowEmailInput: () => { },
  showAddField: false,
  setShowAddField: () => { },

  welcomeScreenTitle: '',
  setWelcomeScreenTitle: () => { },
  welcomeScreenDescription: '',
  setWelcomeScreenDescription: () => { },

  nameInput: '',
  setNameInput: () => { },
  emailInput: '',
  setEmailInput: () => { },

  formFields: [],
  setFormFields: () => { },

  isSubmitted: false,
  setIsSubmitted: () => { },
  currentPage: 0,
  setCurrentPage: () => { },
};

export const AllContext = createContext<ContextType>(defaultContext);

export const useAllContext = () => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useAllContext must be used within a AllProvider');
  }
  return context;
};

type AllProviderProps = {
  children: React.ReactNode;
};

export const AllProvider: React.FC<AllProviderProps> = ({ children }) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState<boolean>(false);
  const [showNameInput, setShowNameInput] = useState<boolean>(false);
  const [showEmailInput, setShowEmailInput] = useState<boolean>(false);
  const [showAddField, setShowAddField] = useState<boolean>(false);

  const [welcomeScreenTitle, setWelcomeScreenTitle] = useState<string>('Welcome to our form');
  const [welcomeScreenDescription, setWelcomeScreenDescription] = useState<string>('This is a description of the form');
  const [nameInput, setNameInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');

  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const contextValue: ContextType = {
    showWelcomePopup,
    setShowWelcomePopup,
    showNameInput,
    setShowNameInput,
    showEmailInput,
    setShowEmailInput,
    showAddField,
    setShowAddField,
    welcomeScreenTitle,
    setWelcomeScreenTitle,
    welcomeScreenDescription,
    setWelcomeScreenDescription,
    nameInput,
    setNameInput,
    emailInput,
    setEmailInput,
    formFields,
    setFormFields,
    isSubmitted,
    setIsSubmitted,
    currentPage,
    setCurrentPage
  };

  return <AllContext.Provider value={contextValue}>{children}</AllContext.Provider>;
};
