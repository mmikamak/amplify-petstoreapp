import { useState } from 'react';
import './App.css';
import { Pets } from './ui-components';
import { NavBar } from "./ui-components";
import { Footer } from "./ui-components";
import { AddPet } from "./ui-components";
import { PetDetails } from './ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react'



function App({user, signOut}) {

  const [showForm, setShowForm] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [pet, setPet] = useState()
  const [updatePet, setUpdatePet] = useState()

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [breed, setBreed] = useState("")
  const [about, setAbout] = useState("")
  const [color, setColor] = useState("")
  const [image, setImage] = useState("")
  
  const fromOverride = {
    TextField29766922: {
      placeholder: name,
    },
    TextField29766923: {
      placeholder: age,
    },
    TextField29766924: {
      placeholder: breed,
    },
    TextField31562686: {
      placeholder: about,
    },
    TextField31562693: {
      placeholder: color,
    },
    TextField31572715: {
      placeholder: image,
    },
    image: {
      src: updatePet == null 
      ? "https://img.favpng.com/11/24/19/dog-cat-puppy-pet-sitting-png-favpng-JVxYpgbyqjMmDC0JKja7CKzxc.jpg"
      : updatePet.image,
    },
    Button31562708: {
      isDisabled: !updatePet ? true : false
    },
    Button29766926 : {
      isDisabled: updatePet ? true : false
    },

    Icon: {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        setShowForm(false)
      }
    }
  }
  const navbarOverrides = {
    Button: {
      onClick: signOut,
    },
    image: {

      src: user?.attribute?.profile,
      //src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.q7pRCGAokNXeU6wA8wYbNAHaEK%26pid%3DApi&f=1"
    },
    "Add Pet": {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        setShowForm(!showForm)
      }
    }

  }


  return (
    <div className="App">
      <NavBar width={"100%"} overrides={navbarOverrides}/> 
      <header className="App-header">
        {showDetails && (
          <PetDetails
            pet={pet}
            style={{
              textAlign: "left",
              margin: "2rem",
              }}
            overrides={{
              Close: {
              style: {
                cursor: "pointer"
              },
              onClick: () => {
                setShowDetails(false)
              },
            },
          }}
        />
      )} 
        
      
      {showForm && (
        <AddPet
        pet={updatePet}
        overrides={fromOverride} 
      style={{
        textAlign: "left",
        margin: "1rem"
        }}
        />
      )}
      
      <Pets 
        overrideItems={({ item, index}) => ({
          overrides: {
            Button31502692: {
            onClick: () => {
            setShowDetails(!showDetails)
            setPet(item)
            },
          },
          Button31502681: {
            onClick: () => {
              if (!showForm) setShowForm(true)
              setUpdatePet(item);
              setName(item.name);
              setAge(item.age);
              setBreed(item.breed);
              setAbout(item.about);
              setColor(item.color);
              setImage(item.image);
            },
          },
        },
      })}
      />
      </header>
      <Footer width={"100%"} />
    </div>
  );
}

export default  withAuthenticator (App);
