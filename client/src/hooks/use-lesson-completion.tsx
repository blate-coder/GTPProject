import { useState, useEffect } from 'react';

// Store and manage completed lessons using localStorage
export function useLessonCompletion() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [highestScore, setHighestScore] = useState<number>(0);

  // Load completed lessons from localStorage on initial render
  useEffect(() => {
    try {
      const storedLessons = localStorage.getItem('completedLessons');
      if (storedLessons) {
        setCompletedLessons(JSON.parse(storedLessons));
      }
      
      const storedScore = localStorage.getItem('highestScore');
      if (storedScore) {
        setHighestScore(parseInt(storedScore, 10));
      }
    } catch (error) {
      console.error('Error loading lesson completion data:', error);
    }
  }, []);

  // Mark a lesson as completed
  const completeLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      const updatedLessons = [...completedLessons, lessonId];
      setCompletedLessons(updatedLessons);
      localStorage.setItem('completedLessons', JSON.stringify(updatedLessons));
    }
  };

  // Update the highest score if the new score is higher
  const updateHighestScore = (score: number) => {
    if (score > highestScore) {
      setHighestScore(score);
      localStorage.setItem('highestScore', score.toString());
    }
  };

  // Check if a lesson is completed
  const isLessonCompleted = (lessonId: number) => {
    return completedLessons.includes(lessonId);
  };

  return {
    completedLessons,
    highestScore,
    completeLesson,
    updateHighestScore,
    isLessonCompleted
  };
}