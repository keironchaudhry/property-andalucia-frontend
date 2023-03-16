import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import Asset from "../../components/Asset";
import BlogDetail from "./BlogDetail";
import NoResults from "../../assets/noresults.png";
import styles from "../../styles/BlogList.module.css";

import { fetchMoreData } from "../../utils/utils";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

/**
 * Code adapted from Code Institute's "Moments" walkthrough.
 */

function BlogList({ message, filter = "" }) {
  const [blog, setBlog] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/blog/?${filter}search=${query}`);
        setBlog(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchBlogPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Container>
      <i class={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`}></i>
      <Form
        onSubmit={(event) => event.preventDefault()}
        className={styles.SearchFeed}
      >
        <Form.Control
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="text"
          placeholder="Enter a keyword..."
        />
      </Form>

      {hasLoaded ? (
        <>
          {blog.results.length ? (
            <InfiniteScroll
              children={blog.results.map((blog) => (
                <BlogDetail key={blog.id} {...blog} setBlog={setBlog} />
              ))}
              dataLength={blog.results.length}
              loader={<Asset spinner />}
              hasMore={!!blog.next}
              next={() => fetchMoreData(blog, setBlog)}
            />
          ) : (
            <Container>
              <Asset src={NoResults} message={message} />
            </Container>
          )}
        </>
      ) : (
        <Container className="mt-3">
          <Asset spinner />
        </Container>
      )}
    </Container>
  );
}

export default BlogList;
