type Props = {
  animal: {
    name: string;
    emoji: string;
  };
};

const Animal = ({ animal }: Props) => {
  return (
    <p className="mb-2">
      {animal.name}
      {animal.emoji}
    </p>
  );
};

export default Animal;
