import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import cn from "classnames";

type Props = {
  addAnimal: Function;
  animals: {
    name: string;
    emoji: string;
  }[];
  handleChange: Function;
  selectedAnimal: string;
};

const PickAnAnimal = ({
  addAnimal,
  animals,
  handleChange,
  selectedAnimal,
}: Props) => {
  const [photo, setPhoto] = useState(null);

  // https://api.unsplash.com/search/photos?query=turtle

  // useEffect(() => {
  //   const fetchRandomPhoto = async () => {
  //     const response = await fetch("./.netlify/functions/unsplash");
  //     if (response.ok) {
  //       const photo = await response.json();
  //       setPhoto(photo);
  //     }
  //   };
  //   fetchRandomPhoto();
  // }, []);

  return (
    <div className="flex justify-start items-center mb-8">
      <InputLabel className="mr-4" id="demo-simple-select-label">
        Animal
      </InputLabel>
      <div className="mr-4">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedAnimal.name}
          label="Animal"
          onChange={handleChange}
        >
          {animals.map((animal, i) => {
            return (
              <MenuItem key={i} value={animal.name}>
                {animal.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <Button onClick={addAnimal} variant="contained">
        Add
      </Button>
      {photo && <img alt={photo.alt_description} src={photo.urls.regular} />}
    </div>
  );
};

export default PickAnAnimal;
