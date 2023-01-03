import {useEffect, useState} from "react";
import React from 'react'
import {Link, useParams } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBAccordion,
   MDBAccordionItem,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import StudioMap from "../studio_map";


const AllStudios = () => {

    const [studios, setStudios] = useState([]);
    const perPage = 1;
    const [query, setQuery] = useState({page: 1, search: ''})
    const [totalPages, setTotalPages] = useState(1)
    const { lat } = useParams();
     const { long } = useParams();




    useEffect(() => {
         const { page, search } = query;
        fetch(`http://localhost:8000/studio/search_studio_by_current_location/${lat}/${long}/?page=${page}&per_page=${perPage}&search=${search}`)
            .then(res => res.json())
            .then(json => {
                setStudios(json.results);
                setTotalPages(json.count);
                {console.log(json)}
            })
    }, [query])


    return (
        <>
            <MDBRow>
             <MDBCol md='4'>

                    <div class="input-group">


                    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"
                        style={{width: 100, height: 30, fontSize: 18, margin: 5, marginLeft: '30px', marginTop: '30px'}}
                        value={query.search}
                        onChange={(event) => {
                            setQuery({
                                search: event.target.value,
                                page: 1,
                            })
                        }}
                    />

                     </div>


                    {studios.map((studio, index) => (

                        <MDBCard style={{marginTop: '20px',marginLeft: '40px', marginBottom: '20px', borderRadius: '10px', width: '85%'}}>

                          <MDBCardBody style={{marginLeft: '10px', borderRadius: '25px', width: '90%'}}>

                             <MDBCardTitle className="text-center h4 fw-bold mb-3 mx-1 mx-md-2 mt-2">{studio.studio_name}</MDBCardTitle>
                             <p> Amenities</p>
                             <MDBListGroup light  style={{ minWidth: '10rem' }}>

                            {studio.studio_amenities.map((amenity, index) => (
                                 <MDBListGroupItem  noBorders color='light' className='px-3 rounded-3 mb-2' >{amenity}</MDBListGroupItem>
                            ))}

                               </MDBListGroup>
                             <p> Classes</p>

                                 <MDBListGroup light  style={{ minWidth: '10rem' }}>



                             {studio.studio_classes.map((a_class, index) => (
                             <MDBListGroupItem className='d-flex justify-content-between align-items-start' noBorders color='light' className='px-3 rounded-3 mb-2' >
                                <div className='ms-2 me-auto'>
                                  <div className='fw-bold'>{a_class.name} </div> Instructor: {a_class.coach}
                                </div>

                              </MDBListGroupItem>
                            ))}
                             </MDBListGroup>





                            <MDBBtn href={`/studio/${studio.studio_id}`}>Visit Page</MDBBtn>

                          </MDBCardBody>

                        </MDBCard>

                        ))}

                        {query.page > 1 ? <button type="button" class="btn btn-secondary btn-rounded"
                        style={{marginTop: '20px',marginLeft: '40px', marginBottom: '20px'}}
                        onClick={() => setQuery({
                ...query,
                page: Math.max(1, query.page - 1)
            })}>prev</button> : <></>}


            {query.page < totalPages/3 ? <button type="button" class="btn btn-secondary btn-rounded"
            style={{marginTop: '20px',marginLeft: '40px', marginBottom: '20px'}}
            onClick={() => setQuery({
                ...query,
                page: query.page + 1
            })}>next</button> : <></>}



             </MDBCol>


              <MDBCol md='5'>
                {StudioMap()}
              </MDBCol>

            </MDBRow>


        </>
    )
}

export default AllStudios ;
