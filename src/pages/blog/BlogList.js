import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import Asset from "../../components/Asset";
import BlogDetail from "./BlogDetail";
import NoResults from "../../assets/noresults.png";

import { fetchMoreData } from "../../utils/utils";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function BlogList({ message, filter = "" }) {
  const [blog, setBlog] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data } = await axiosReq.get(
          `/blog/?${filter}search=${query}`
        );
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
      <div>
        <Form
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search through our posts using keywords..."
          />
        </Form>
      </div>

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
        <Container>
          <Asset spinner />
        </Container>
      )}
    </Container>
  );
}

export default BlogList;
