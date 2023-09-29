"use client";

import { Club, NULL_CLUB } from "@/lib/club";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ContextProps {
  profile: Club;
  setProfile: Dispatch<SetStateAction<Club>>;
}

const ProfileContext = createContext<ContextProps>({
  profile: NULL_CLUB,
  setProfile: (value: SetStateAction<Club>) => value,
});

export const ProfileContextProvider = ({ children }: { children: any }) => {
  const [profile, setProfile] = useState<Club>(NULL_CLUB);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
