import React, {useEffect, useState} from "react";

import {
  MDBCarousel,
  MDBCarouselItem,
   MDBCard,
  MDBCardBody,
    MDBBtn,
  MDBContainer,
  MDBCardText,
  MDBCardTitle,
  MDBCardImage
} from 'mdb-react-ui-kit';

import { useParams } from 'react-router-dom';



const StudiosPage = ({match}) => {

    const [studios, setStudios] = useState([]);
    const [query, setQuery] = useState({search: ''})
    const { id } = useParams();




    useEffect(() => {
        const {search} = query;


        fetch(`http://127.0.0.1:8000/studio/studio_page/${id}/`)
            .then(res => res.json())
            .then(json => {
                setStudios(json.data[0]);
            console.log(json.data[0].images.length)
            })

    }, [query])







    //{"data": [{"name": "pink", "address": "130 blvd", "phone_number": "123456789", "location": "90.0, 80.0", "amenities": "[]", "link_to_directions": "https://www.google.com/maps/dir/?api=1&origin=90.0,180.0&destination=90.0,80.0&travelmode=driving", "images": "[]"}]}
    return (
    <MDBContainer style={{marginLeft: '20%', marginRight: '25%', marginTop: '1%'}}>

      <MDBCard className='text-black m-5' style={{marginLeft: '100px', borderRadius: '25px', width: '60%'}}>
      <MDBCardTitle className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{studios.name}</MDBCardTitle>


     {studios.images && studios.images.map((image, index) => (
      <MDBCardImage src={image} alt='...' position='top' />


     ))}
     <MDBCardBody>
        <p>
          {studios.address}

        </p>
        <p>

          {studios.phone_number}

        </p>
        <p>

          {studios.location}
        </p>
        <a href={studios.link_to_directions} class="btn btn-info" role="button">Get Directions</a>
      </MDBCardBody>
      </MDBCard>

    </MDBContainer>


  );

}

export default StudiosPage;



