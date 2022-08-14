import React, { useEffect, useState } from "react";
import DogInfo from "./DogInfo";
import DogSpan from "./DogSpan";

function App() {
  //Step 1: Fetch the Data with useEffect and store the data in state

  const [pupData, setPupData] = useState([])
  const [selectedPup, setSelectedPup] = useState(null)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3001/pups')
      .then(r => r.json())
      .then(data => setPupData(data))
  }, [])

  //Step 2: Map through the data and create a button/div for each dog.
  //Make a useState to determine the selected dog. Clicking on button will update this state

  const filteredPupData = pupData.filter((dog) => {
    if (toggle) {
      return dog.isGoodDog === true
    } else {
      return true
    }
  })

  const dogsInBar = filteredPupData.map((dog) => {
    return (
      <DogSpan key={dog.id} data={dog} setSelectedPup={setSelectedPup} />
    )
  })




  //Step 5: handletoggle will update a state that will change which buttons/divs gets displayed
  const handleToggle = (e) => {
    const negated = !toggle
    setToggle(negated)
  }

  //Step 6: Create a a handlePatch for toggling the Good and Bad Dog data
  //Function will be passed to child. Callback function will retrieve the id and negated value
  //We then update both states to reflect changes made in the server without refreshing
  //And so the user can see the results of their input immediately after clicking
  const handlePatch = (id, negated) => {
    fetch(`http://localhost:3001/pups/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: negated
      })
    }).then(r => r.json())
      .then(update => {
        setSelectedPup(update)
        const updatedPupData = pupData.map((dog) => {
          if (dog.id === id) {
            dog.isGoodDog = negated
            return dog
          } else {
            return dog
          }
        })
        setPupData(updatedPupData)
      })
  }


  return (
    <div className="App">
      <div id="filter-div">
        {/* Step 4: Create useStae for toggle. onClick affects toggle */}
        <button id="good-dog-filter" onClick={handleToggle}>{toggle ? "Filter good dogs: ON" : "Filter good dogs: OFF"}</button>
      </div>
      <div id="dog-bar">
        {dogsInBar}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {/*Step 3: Summary container content changes depending on state */}
          {selectedPup && <DogInfo selectedPup={selectedPup} handlePatch={handlePatch} />}
        </div>
      </div>
    </div>
  );
}

export default App;
