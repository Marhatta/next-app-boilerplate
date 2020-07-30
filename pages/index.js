import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
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
    <Layout>
      <h1 className="alert alert-primary">This is the index page</h1>
      <Dummy />
      <Link href="/newPage">
        <a>Go to new page</a>
      </Link>
      <br/>
      <Link href="/user">
        <a>Go to user page</a>
      </Link>

      {books.map((book) => {
        return <h2 key={book._id}>{book.name}</h2>;
      })}
    </Layout>
  );
};

/** Prop type checking */
Home.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};

export default Home;
