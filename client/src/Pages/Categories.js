import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import CategoriesNav from '../components/Categories/CategoriesNav'
import ProductCard from '../components/ProductCard/ProductCard';
import { Spinner } from 'react-bootstrap';
import { getAll } from '../services/productData';
import '../components/Siders/SearchSider.css'
import '../components/Categories/Categories.css';
import '../components/ProductCard/ProductCard.css';

function Categories({ match }) {
    let currentCategory = match.params.category;
    const [products, setProduct] = useState([])
    // const [page, setPage] = useState(1);
    // const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setPage(1);
        setLoading(true);
        // setQuery("")
        getAll(1, 1000)
            .then(res => {
                setProduct(res.tasks);
                setLoading(false);
                // setPage(page => page + 1);
                // setQuery("");
            })
            .catch(err => console.log(err));
    }, [currentCategory, setProduct])

    // const handleSearch = (e) => {
    //     e.preventDefault()
    //     setQuery(e.target.value)
    // }

      return (
        <>
            <div id="sider">
                {/* <input className="col-lg-6" type="text" placeholder="Search..." name="search" value={query} onChange={handleSearch} /> */}
            </div>
            <div className="mainContainer wrap">
            <CategoriesNav />
                <div className="container pt-5">
                    {/* <Dropdown id="dropdown-sort">
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            Sort <BiSort />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setSort('oldest') }}>Oldest <BiDownArrowAlt /></Dropdown.Item>
                            <Dropdown.Item onClick={() => { setSort('newest') }}>Newest <BiUpArrowAlt /></Dropdown.Item>
                            <Dropdown.Item onClick={() => { setSort('lowerPrice') }}>Price <BiSortDown /></Dropdown.Item>
                            <Dropdown.Item onClick={() => { setSort('biggerPrice') }}>Price <BiSortUp /> </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                    {!loading ?
                        <InfiniteScroll
                            dataLength={products.length}
                            next={() => {
                                // if (query === "") {
                                //     getAll(page, 5)
                                //         .then(res => {
                                //             setProduct([...products, ...res.tasks]);
                                //             setPage(page + 1)
                                //         })
                                // }
                            }}
                            hasMore={() => {
                                // if (products.length > 0) {
                                //     return true
                                // }
                                return false
                            }}
                            className="row categoryRow">
                            {products
                                .map(x =>
                                    // <Col xs={12} md={6} lg={3} key={x._id.toString()}>
                                        <ProductCard params={x} key={x._id.toString()} />
                                    // </Col>
                                )}
                        </InfiniteScroll>
                        : <div className="spinner">
                            <Spinner animation="border" />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Categories;