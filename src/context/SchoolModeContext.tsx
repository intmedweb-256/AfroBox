import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SchoolCurriculumTopic {
  pillar: string;
  subject: string;
  gradeLevel: string;
  learningGoals: string[];
  suggestedActivities: string[];
}

interface SchoolModeContextType {
  isSchoolMode: boolean;
  setIsSchoolMode: (val: boolean) => void;
  isProjectorSize: boolean;
  setIsProjectorSize: (val: boolean) => void;
  isCurriculumOpen: boolean;
  setIsCurriculumOpen: (val: boolean) => void;
  toggleFullscreen: () => void;
}

const SchoolModeContext = createContext<SchoolModeContextType>({
  isSchoolMode: true,
  setIsSchoolMode: () => {},
  isProjectorSize: false,
  setIsProjectorSize: () => {},
  isCurriculumOpen: false,
  setIsCurriculumOpen: () => {},
  toggleFullscreen: () => {}
});

export const SchoolModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSchoolMode, setIsSchoolMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('afrobox_school_mode');
    return saved !== null ? saved === 'true' : true; // Default ON for schools & education centers
  });

  const [isProjectorSize, setIsProjectorSize] = useState<boolean>(() => {
    return localStorage.getItem('afrobox_projector_size') === 'true';
  });

  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('afrobox_school_mode', String(isSchoolMode));
  }, [isSchoolMode]);

  useEffect(() => {
    localStorage.setItem('afrobox_projector_size', String(isProjectorSize));
  }, [isProjectorSize]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <SchoolModeContext.Provider
      value={{
        isSchoolMode,
        setIsSchoolMode,
        isProjectorSize,
        setIsProjectorSize,
        isCurriculumOpen,
        setIsCurriculumOpen,
        toggleFullscreen
      }}
    >
      {children}
    </SchoolModeContext.Provider>
  );
};

export const useSchoolMode = () => useContext(SchoolModeContext);
