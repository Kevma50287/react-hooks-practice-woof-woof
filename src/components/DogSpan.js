import React from 'react'

export default function DogSpan({ data, setSelectedPup }) {
    const { id, name, isGoodDog, image } = data
    
    function handleSelect(e) {
        console.log(id, name, isGoodDog, image)
        setSelectedPup(data)
    }

    return (
        <span onClick={handleSelect}>{name}</span>
    )
}
