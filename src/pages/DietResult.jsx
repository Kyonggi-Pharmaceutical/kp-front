import React, { useEffect, useState } from 'react';

function ExerciseList() {
    const [exerciseList, setExerciseList] = useState([]);

    useEffect(() => {
    async function fetchExerciseList() {
        const response = await fetch('/api/v1/exercises/exerciseSolution');
        const data = await response.json();
        setExerciseList(data);
    }
    fetchExerciseList();
}, []);

return (
    <div>
        {Array.isArray(exerciseList) && exerciseList.map(exercise => (
            <div key={exercise.id}>
                <p>Name: {exercise.name}</p>
            </div>
        ))}
    </div>
);
}

export default ExerciseList;