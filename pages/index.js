import Link from "next/link";
import axios from "axios";

import Dummy from "../components/Dummy";

/**
    @author [vishal marhatta]
    @see https://github.com/Marhatta/next-app-boilerplate
    @function Home
    @description Gets the list of books from from server using getServerSideProps
    @returns jsx
    @version 1.1.0
    @todo We want to do something that we don't know yet
 */

/** Runs on every request*/
export const getServerSideProps = async () => {
  const res = await axios.get(
    "https://thawing-inlet-62428.herokuapp.com/api/books"
  );
  const books = await res.data;
  return {
    props: {
      books,
    },
  };
};

const Home = ({ books }) => {
  return (
    <div>
      <h1>This is the index page</h1>
      <Dummy />
      <Link href="/newPage">
        <a>Go to new page</a>
      </Link>
      {books.map((book) => {
        return <h2 key={book._id}>{book.name}</h2>;
      })}
    </div>
  );
};

export default Home;
