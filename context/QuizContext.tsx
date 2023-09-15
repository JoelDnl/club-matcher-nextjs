"use client";

import { QuizData } from "@/data/QuizData";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ContextProps {
  quizData: number[];
  setQuizData: Dispatch<SetStateAction<number[]>>;
  isFilled: () => boolean;
}

const QuizContext = createContext<ContextProps>({
  quizData: Array(QuizData.length).fill([-1]).flat(),
  setQuizData: (): number[] => [],
  isFilled: (): boolean => false,
});

export const QuizContextProvider = ({ children }: { children: any }) => {
  const [quizData, setQuizData] = useState<number[]>(
    Array(QuizData.length).fill([-1]).flat()
  );

  const isFilled = () => {
    if (quizData.length <= 1) return false;
    for (let i = 1; i < quizData.length; i++) {
      if (quizData[i] < 0) return false;
    }
    return true;
  };

  return (
    <QuizContext.Provider value={{ quizData, setQuizData, isFilled }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
