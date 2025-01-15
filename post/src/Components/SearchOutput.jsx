import React, { useContext, useEffect, useState } from 'react';
import { CardContext } from './Context';
import './Product.css';
import { useNavigate } from 'react-router-dom';

function SearchOutput() {
  const [searchData, setSearchData] = useState([]);
  const [pgData, setPgData] = useState([]);
  const [PB, setPB] = useState([]);
  const [current, setCurrent] = useState(1);
  const { searchInp ,setCardDetail} = useContext(CardContext);
  const navigate=useNavigate()
  const pagePerPost = 15;

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Fetch and filter data
  const fetchFilteredData = async (query) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      if (!res.ok) {
        throw new Error("Error fetching data");
      }
      const data = await res.json();
      const finalData = data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchData(finalData);

      // Calculate pagination buttons
      const totalData = finalData.length;
      const totalButton = Math.ceil(totalData / pagePerPost);
      const btnArr = Array.from({ length: totalButton }, (_, i) => ({
        text: (i + 1).toString(),
        id: i + 1,
      }));
      setPB(btnArr);

      // Reset to the first page
      setCurrent(1);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Debounced version of the fetch function
  const debouncedFetchFilteredData = debounce(fetchFilteredData, 2000);

  // Update paginated data
  useEffect(() => {
    const startIndex = (current - 1) * pagePerPost;
    const endIndex = startIndex + pagePerPost;
    setPgData(searchData.slice(startIndex, endIndex));
  }, [searchData, current]);

  // Fetch data when search input changes (debounced)
  useEffect(() => {
    if (searchInp.trim()) {
      debouncedFetchFilteredData(searchInp);
    }
  }, [searchInp]);

  // Handle pagination button clicks
  const handlePageChange = (page) => {
    setCurrent(page);
  };
  const cardHandler=(id)=>{
    async function fetchPostId(id){
      const res=await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      if(!res.ok){
        throw new Error("Fetching error");
      }
      const data = await res.json()
      console.log(data)
      setCardDetail(data)
      
    }
    fetchPostId(id)
    navigate("/cardDetail")
  }

  // Handle Next button
  const handleNext = () => {
    if (current < PB.length) {
      setCurrent(current + 1);
    }
  };

  // Handle Previous button
  const handlePrev = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  return (
    <>
      <div className="container">
        {pgData.map((item) => (
          <div key={item.id} className="card">
            <h1 onClick={()=>cardHandler(item.id)}>{item.title}</h1>
            <h5 onClick={()=>cardHandler(item.id)}>{item.body}</h5>
          </div>
        ))}
      </div>
      <div className='paginationButton'>
        <button onClick={handlePrev} disabled={current === 1}>
          Prev
        </button>
        
        <button onClick={handleNext} disabled={current === PB.length}>
          Next
        </button>
      </div>
    </>
  );
}

export default SearchOutput;
