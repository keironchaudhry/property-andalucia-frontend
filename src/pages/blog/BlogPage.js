import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { axiosReq } from "../../api/axiosDefaults";
import BlogDetail from "./BlogDetail";

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: blog }] = await Promise.all([
          axiosReq.get(`/blog/${id}`),
        ]);
        setBlog({ results: [blog] });
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      <Col>
        <BlogDetail {...blog.results[0]} setBlog={setBlog} blogPage />
      </Col>
    </Container>
  );
}
