import React, { createContext, useState, useContext, ReactNode } from "react";

type TopicType = "general" | "science" | "entertainment" | "sports" | "history";

type TopicContextType = {
  selectedTopic: TopicType;
  setSelectedTopic: (topic: TopicType) => void;
  questions: string[];
  setQuestions: (questions: string[]) => void;
};

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export const TopicProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicType>("general");
  const [questions, setQuestions] = useState<string[]>([]);

  return (
    <TopicContext.Provider
      value={{ selectedTopic, setSelectedTopic, questions, setQuestions }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export const useTopicContext = (): TopicContextType => {
  const context = useContext(TopicContext);
  if (context === undefined) {
    throw new Error("useTopicContext must be used within a TopicProvider");
  }
  return context;
};
