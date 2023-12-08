import { FooterPart } from "../components/Footer";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = ({ title, content, linkTo }) => (
  <div className="bg-white p-4 rounded-lg">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p>{content}</p>
    <Link
      to={linkTo}
      className="mt-4 bg-slate-800 inline-block p-2 text-white rounded-lg hover:bg-slate-600"
    >
      <p className="">Silahkan Dicoba</p>
    </Link>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};

export const Home = () => {
  return (
    <div className="min-h-screen bg-slate-800 flex justify-center">
      <div className="container w-2/3  my-10 border border-white rounded-2xl">
        <h1 className="mt-3 text-center text-white text-3xl font-bold">
          MINI GAMES AND JS FEATURES
        </h1>
        <div className="flex items-center justify-center h-full">
          <div className="grid grid-cols-2 gap-4">
            <Card
              title="Tic Tac Toe"
              content="Permainan 2 orang"
              linkTo="/tictactoe"
            />
            <Card
              title="Fetch API Provinsi"
              content="Pengujian Fetch API Provinsi Indonesia"
              linkTo="/fetchapi"
            />
            <Card
              title="Calculator"
              content="Calculator Sederhana"
              linkTo="/calculator"
            />
            <Card title="Card 4" content="Content for Card 4" linkTo="/page4" />
          </div>
        </div>
      </div>
      <FooterPart />
    </div>
  );
};
