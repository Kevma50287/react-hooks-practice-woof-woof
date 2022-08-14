import React from 'react'

export default function DogInfo({selectedPup, handlePatch}) {
    const {image, name, isGoodDog, id} = selectedPup

    return (
        <>
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <button onClick={()=>handlePatch(id, !isGoodDog)}>{isGoodDog ? "Good Dog!" : "Bad dog!"}</button>
        </>
    )
}
