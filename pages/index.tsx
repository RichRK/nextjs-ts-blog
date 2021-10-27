import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Post from "../types/post";
import PickAnAnimal from "../components/pick-an-animal";
import { SyntheticEvent, useEffect, useState } from "react";
import Animal from "../components/animal";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SelectChangeEvent } from "@mui/material/Select";

type Animal = {
  name: string
  emoji: string
}

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {

  const emptyAnimalArray: Animal[] = [];
  const animals: Animal[] = [
    { name: "Turtle", emoji: "🐢" },
    { name: "Giraffe", emoji: "🦒" },
    { name: "Lion", emoji: "🦁" },
    { name: "Shark", emoji: "🦈" },
    { name: "Zebra", emoji: "🦓" },
    { name: "Gorilla", emoji: "🦍" },
    { name: "Peacock", emoji: "🦚" },
    { name: "Frog", emoji: "🐸" },
    { name: "Dog", emoji: "🐶" },
    { name: "Elephant", emoji: "🐘" },
    { name: "Bear", emoji: "🐻" },
  ];

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(animals[0]);
  const [sponsoredAnimals, setSponsoredAnimals] = useState(emptyAnimalArray);

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  const addAnimal = (): void => {
    if (!sponsoredAnimals.includes(selectedAnimal)) {
      setSponsoredAnimals([...sponsoredAnimals, selectedAnimal]);
      setIsErrorOpen(false);
    } else {
      setIsErrorOpen(true);
    }
  };

  const clearAnimals = (): void => {
    setSponsoredAnimals([]);
  };

  const handleChange = (event: SelectChangeEvent) => {
    let animal = animals.filter((x) => x.name === event.target.value ?? '');
    setSelectedAnimal(animal[0]);
  };

  const handleClose = (event: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsErrorOpen(false);
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={5000}
            onClose={handleClose}
            open={isErrorOpen}
          >
            <Alert
              icon={false}
              onClose={handleClose}
              severity="warning"
              variant="filled"
            >
              They're already in your sponsor list!
            </Alert>
          </Snackbar>
          <Intro />
          <PickAnAnimal
            addAnimal={addAnimal}
            animals={animals}
            handleChange={handleChange}
            selectedAnimal={selectedAnimal}
          />
          <div className="animalContainer">
          {sponsoredAnimals.map((animal, i) => {
            return <Animal animal={animal} key={i} />;
          })}
          </div>
          {sponsoredAnimals.length > 0 && (
            <Button
              className="mt-5 mb-9"
              onClick={clearAnimals}
              variant="outlined"
            >
              Clear all
            </Button>
          )}
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
