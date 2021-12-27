import {useEffect,useState} from 'react'
import { Card,CardHeader,CardBody,Col,Row,Input,InputGroup,InputGroupAddon,InputGroupText,Spinner } from 'reactstrap'
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

const Paginate = ({filter,itemsPerPage,data,callback}) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  //on first load of data
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = Number(itemOffset) + Number(itemsPerPage);
    let list = data.filter(x=>{
      for (const key in filter){
        if (x[key].match(new RegExp(filter[key],'i'))){
          return x
        }
      }
    })
    setCurrentPageNumber((currentPageNumber)=>0)
    setItemOffset((itemOffset)=>0)
    setCurrentItems(list.filter(x=>{
      for (const key in filter){
        if (x[key].match(new RegExp(filter[key],'i'))){
          return x
        }
      }
    }).slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / itemsPerPage));
  }, [data]);

  //returns currentitems
  useEffect(()=>{
    callback({pageNumber:currentPageNumber,data:currentItems})
  },[currentItems])

  useEffect(()=>{
    setCurrentPageNumber((currentPageNumber)=>currentPageNumber)
  },[currentPageNumber])

  useEffect(()=>{
    let endOffset = Number(itemOffset) + Number(itemsPerPage);
    let list = data.filter(x=>{
      for (const key in filter){
        if (x[key].match(new RegExp(filter[key],'i'))){
          return x
        }
      }
    })
    //in the event search list does not extend to list length
    if (itemOffset > list.length){
      setItemOffset((itemOffset)=>0)
      setCurrentPageNumber((currentPageNumber)=>0)
      endOffset = Number(itemOffset) + Number(itemsPerPage);
    }
    setCurrentItems(currentItems=>list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / itemsPerPage));
  },[itemOffset,itemsPerPage,filter])

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage)
    setCurrentPageNumber((currentPageNumber)=>event.selected)
    setItemOffset(newOffset);
  };

  return (
    <div>
    {data.length > 0 ?
      <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        forcePage={currentPageNumber}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        activeClassName='ActivePage'
        containerClassName={"Paginate"}
        pageLinkClassName={'PaginateLink'}
      />
      </div>
      :
      <Spinner/>
    }

    </div>
  );
};

export default Paginate;
