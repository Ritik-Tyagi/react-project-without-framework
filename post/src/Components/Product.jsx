import React, { useContext, useEffect, useState } from "react";
import "./Product.css";
import { CardContext } from "./Context";
import { useNavigate } from "react-router-dom";

function Product() {
  const navigate = useNavigate();
  const { cardDetail, setCardDetail } = useContext(CardContext);
  const { card, setCard } = useContext(CardContext);
  const [totalPost, setTotalPost] = useState(0);
  const [post, setPost] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [paginationButton, setPaginationButton] = useState([]);
  const [current, setCurrent] = useState(1);
  const [btnTracker, setBtnTracker] = useState([]);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const postPerPage = 15;

  useEffect(() => {
    async function total_post() {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const data = await res.json();
        const total = data.length;
        setTotalPost(total);

        const totalPage = Math.ceil(total / postPerPage);
        const buttons = [];
        const btnarr = [];
        for (let i = 1; i <= totalPage; i++) {
          btnarr.push(i);
          buttons.push({
            text: i.toString(),
            "data-id": i,
          });
        }
        setPaginationButton(buttons);
        setBtnTracker(btnarr);
        setStart(btnarr[0]);
        setEnd(btnarr.length);
      } catch (error) {
        console.error("Error fetching total posts:", error);
      }
    }
    total_post();
  }, [postPerPage]);

  const fetchPost = async (page = 1) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=15`);
      if (!res.ok) throw new Error("Fetching error");
      const data = await res.json();
      setPost(data);
      setCurrent(page);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch posts.");
    }
  };

  useEffect(() => {
    fetchPost(1);
  }, []);

  const handler = (page) => {
    setPageNo(page);
    fetchPost(page);
  };

  const cardHandler = (id) => {
    async function fetchPostId(id) {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!res.ok) throw new Error("Fetching error");
        const data = await res.json();
        setCardDetail(data);
        navigate("/cardDetail");
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
    fetchPostId(id);
  };

  const AddCart = (e, id) => {
    e.stopPropagation();
    async function card(id) {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!res.ok) throw new Error("Card fetch error");
        const data = await res.json();
        setCard((prev) => [...prev, data]);
        alert("Added to cart successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to add to cart.");
      }
    }
    card(id);
  };

  const prevHandler = (current) => {
    if (current > start) {
      let newPage = current - 1;
      setCurrent(newPage);
      fetchPost(newPage);
    }
  };

  const nextHandler = (current) => {
    if (current < end) {
      let newPage = current + 1;
      setCurrent(newPage);
      fetchPost(newPage);
    }
  };

  const SelectData = (e) => {
    if (e.target.value === "asending") {
      let sortData = [...post].sort((a, b) => a.title.localeCompare(b.title));
      setPost(sortData);
    } else if (e.target.value === "desending") {
      let sortData = [...post].sort((a, b) => b.title.localeCompare(a.title));
      setPost(sortData);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "#FFFDEC", display: "flex", alignItems: "center" }}>
        <h3 style={{ color: "black", marginRight: "8px" }}>Sorting:</h3>
        <select
          style={{ width: "300px", cursor: "pointer", borderRadius: "5px", height: "23px" }}
          onChange={SelectData}
        >
          <option value="-">--Select--</option>
          <option value="asending">Ascending</option>
          <option value="desending">Descending</option>
        </select>
      </div>
      <div className="container">
        {post.map((item) => (
          <div key={item.id} className="card" onClick={() => cardHandler(item.id)}>
            
            <h1 style={{ cursor: "pointer",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",width:'250px' }}>{item.title}</h1>
            
            <h4>{item.body}</h4>
            <button
              style={{ cursor: "pointer" }}
              className="addcart-button"
              onClick={(e) => AddCart(e, item.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="paginationButton">
        <button style={{ cursor: "pointer" }} onClick={() => prevHandler(current)}>
          Previous
        </button>
        {paginationButton.map((item) => (
          <button
            key={item["data-id"]}
            onClick={() => handler(item["data-id"])}
            className={`button ${current === item["data-id"] ? "active" : ""}`}
          >
            {item.text}
          </button>
        ))}
        <button style={{ cursor: "pointer" }} onClick={() => nextHandler(current)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Product;
