import React, {useEffect, useState} from "react";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link, useHref, useParams } from "react-router-dom";

const UsingFetch = () => {
    const [data, setData] = useState([]);
    const [newdata, setData2] = useState([]);
    const [newdata2, setData3] = useState([]);
    const [newdata3, setData4] = useState([]);
    const [query, setQuery] = useState({page: 1, search: ''})
    const [totalPages, setTotalPages] = useState(1)
    const [totalPages2, setTotalPages2] = useState(1)
    const [totalPages3, setTotalPages3] = useState(1)
    const [totalPages4, setTotalPages4] = useState(1)

    const [is_enrolled, setisEnrolled] = useState('');
    const id = useParams();
  
const fetchData = () => {
    const { page, search } = query;

        
    
      // .then ((response) => response.json())
      // .then ((data) => {setData(data)})
      // .then (console.log(data));
      // }
      
        //  fetch ('http://localhost:8000/classes/classes-view/?page=2', {
        //       credentials: 'include',
        //   }) .then(res => res.json())
        //   .then(json => {
        //       setData(json.results);
        //       setTotalPages(json.count);
        //       {console.log(json)}
        //   })
        fetch (`http://localhost:8000/classes/classes-view/`, {
          credentials: 'include',
      })
      
        // .then ((response) => response.json())
        // .then ((data) => {setData(data)})
        // .then (console.log(data));
        // }
        .then(res => res.json())
              .then(data => {
                  setData(data.results);
                  setTotalPages(data.count);
                  {console.log(data)}
              })
          fetch (`http://localhost:8000/classes/classes-view/?page=2`, {
          credentials: 'include',
      })
      
        // .then ((response) => response.json())
        // .then ((data) => {setData(data)})
        // .then (console.log(data));
        // }
        .then(res => res.json())
              .then(newdata => {
                  setData2(newdata.results);
                  setTotalPages2(newdata.count);
                  {console.log(newdata)}
                  
              })
          fetch (`http://localhost:8000/classes/classes-view/?page=3`, {
            credentials: 'include',
        })
        
          // .then ((response) => response.json())
          // .then ((data) => {setData(data)})
          // .then (console.log(data));
          // }
          .then(res => res.json())
                .then(newdata2 => {
                    setData3(newdata2.results);
                    setTotalPages3(newdata2.count);
                    {console.log(newdata2)}
                    
                })
              fetch (`http://localhost:8000/classes/classes-view/?page=4  `, {
                credentials: 'include',
            })
            
              // .then ((response) => response.json())
              // .then ((data) => {setData(data)})
              // .then (console.log(data));
              // }
              .then(res => res.json())
                    .then(newdata3 => {
                        setData4(newdata3.results);
                        setTotalPages4(newdata3.count);
                        {console.log(newdata3)}
                        
                    })
              

      
  }
  // setData(data.concat(newdata.results))
    useEffect(() => {
        fetchData()
    }, [query])
  
      return (
                <>
                <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col' class="th-lg">Name</th>
          <th scope='col' class="th-lg">Coach</th>
          <th scope='col' class="th-lg">Description</th>
          <th scope='col' class="th-lg">Capacity</th>
          <th scope='col' class="th-lg">Space Available</th>
          <th scope='col' class="th-lg">Day</th>
          <th scope='col' class="th-lg">Start Time</th>
          <th scope='col'>End Time</th>
          <th scope='col'>Start Date</th>
          <th scope='col'>End Date</th>
          <th scope='col'>Frequency</th>
          <th scope='col'>Studio</th>
          <th scope='col'>Cancelled</th>
          <th scope='col'>Enrolled</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <div className='ms-3'>
               {data.map(data => (
                   <h6 key={data.id}>
                    {data.name}</h6>))}
                <p className='fw-bold mb-1'></p>
              </div>
            </div>
          </td>
          <td>
          {data.map(data => (
                   <h6 key={data.id}>
                    {data.coach}</h6>))}

          </td>
          <td style={{marginLeft: '0%', marginRight: '0%', marginTop: '10%', width: '200px  '}}>
            {/* <MDBBadge color='success' pill>
              Active
            </MDBBadge> */}
            {data.map(data => (
                   <h6 key={data.id}>
                    {data.description}</h6>))}

          </td>
          <td>
          {data.map(data => (
                   <h6 key={data.id}>
                    {data.capacity}</h6>))}

          </td>
          <td>
          {data.map(data => (
                   <h6 key={data.id}>
                    {data.space_available}</h6>))}

          </td>
          <td>
            {data.map(data => (
                   <h6 key={data.id}>
                    {data.day}</h6>))}

          </td>
          <td>
          {data.map(data => (
                   <h6 key={data.id}>
                    {data.start_time}</h6>))}

          </td>
          <td>
          {data.map(data => (
                   <h6 key={data.id}>
                    {data.end_time}</h6>))}

          </td>
          <td>
          {data.map(data => (
                   <h6 key={data.id}>
                    {data.start_date}</h6>))}

          </td>
          <td>
          {data.map(data => (
                   <h6 key={data.id}>
                    {data.end_date}</h6>))}

          </td>
          <td>
          {data.map(data => (
                   <h6 key={data.id}>
                    {data.length}</h6>))}

          </td>
          <td>
          {data.map(data => (
                   <h6 key={data.id}>
                    {data.studio}</h6>))}

          </td>
          <td>
          {data.map(data => (
                   <h6 key={data.id}>
                    {data.is_cancelled}</h6>))}

          </td>
          <td>
          {data.map(data => (
                   <h6 key={data.id}>
                    {data.is_enrolled}</h6>))}

          </td>
          <td>
          {/* {data.map(data => (
                   <h6 key={data.id}>
                    {data.is_cancelled}</h6>))} */}
            {data.map(data => (
                    <MDBBtn key={data.id} size='sm' style={{marginLeft: '0%', marginRight: '0%', marginTop: '10%', width: '100%'}} href="/enrolledclass" >
                    Enrol</MDBBtn>))}
         

          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <div className='ms-3'>
               {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.name}</h6>))}
                <p className='fw-bold mb-1'></p>
              </div>
            </div>
          </td>
          <td>
          {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.coach}</h6>))}

          </td>
          <td style={{marginLeft: '0%', marginRight: '0%', marginTop: '10%', width: '200px  '}}>
            {/* <MDBBadge color='success' pill>
              Active
            </MDBBadge> */}
            {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.description}</h6>))}

          </td>
          <td>
          {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.capacity}</h6>))}

          </td>
          <td>
          {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.space_available}</h6>))}

          </td>
          <td>
            {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.day}</h6>))}

          </td>
          <td>
          {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.start_time}</h6>))}

          </td>
          <td>
          {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.end_time}</h6>))}

          </td>
          <td>
          {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.start_date}</h6>))}

          </td>
          <td>
          {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.end_date}</h6>))}

          </td>
          <td>
          {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.length}</h6>))}

          </td>
          <td>
          {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.studio}</h6>))}

          </td>
          <td>
          {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.is_cancelled}</h6>))}

          </td>
          <td>
          {newdata.map(newdata => (
                   <h6 key={newdata.id}>
                    {newdata.is_enrolled}</h6>))}

          </td>
          <td>
          {/* {data.map(data => (
                   <h6 key={data.id}>
                    {data.is_cancelled}</h6>))} */}
            {newdata.map(newdata => (
                    <MDBBtn key={newdata.id} size='sm' style={{marginLeft: '0%', marginRight: '0%', marginTop: '10%', width: '100%'}} href="/enrolledclass">
                    Enrol</MDBBtn>))}
         

          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <div className='ms-3'>
               {newdata2.map(newdata2 => (
                   <h6 key={newdata2.id}>
                    {newdata2.name}</h6>))}
                <p className='fw-bold mb-1'></p>
              </div>
            </div>
          </td>
          <td>
          {newdata2.map(newdata2 => (
                   <h6 key={newdata2.id}>
                    {newdata2.coach}</h6>))}

          </td>
          <td style={{marginLeft: '0%', marginRight: '0%', marginTop: '10%', width: '200px  '}}>
            {/* <MDBBadge color='success' pill>
              Active
            </MDBBadge> */}
            {newdata2.map(newdata2 => (
                   <h6 key={newdata2.id}>
                    {newdata2.description}</h6>))}

          </td>
          <td>
          {newdata2.map(newdata2 => (
                   <h6 key={newdata2.id}>
                    {newdata2.capacity}</h6>))}

          </td>
          <td>
          {newdata2.map(newdata2 => (
                   <h6 key={newdata2.id}>
                    {newdata2.space_available}</h6>))}

          </td>
          <td>
            {newdata2.map(newdata2 => (
                   <h6 key={newdata2.id}>
                    {newdata2.day}</h6>))}

          </td>
          <td>
          {newdata2.map(newdata2 => (
                   <h6 key={newdata2.id}>
                    {newdata2.start_time}</h6>))}

          </td>
          <td>
          {newdata2.map(newdata2 => (
                   <h6 key={newdata2.id}>
                    {newdata2.end_time}</h6>))}

          </td>
          <td>
          {newdata2.map(newdata2 => (
                   <h6 key={newdata2.id}>
                    {newdata2.start_date}</h6>))}

          </td>
          <td>
          {newdata2.map(newdata2 => (
                   <h6 key={newdata2.id}>
                    {newdata2.end_date}</h6>))}

          </td>
          <td>
          {newdata2.map(newdata2 => (
                   <h6 key={newdata2.id}>
                    {newdata2.length}</h6>))}

          </td>
          <td>
          {newdata2.map(newdata2 => (
                   <h6 key={newdata2.id}>
                    {newdata2.studio}</h6>))}

          </td>
          <td>
          {newdata2.map(newdata2 => (
                   <h6 key={newdata2.id}>
                    {newdata2.is_cancelled}</h6>))}

          </td>
          <td>
          {newdata2.map(newdata2 => (
                   <h6 key={newdata.id}>
                    {newdata.is_enrolled}</h6>))}

          </td>
          <td>
          {/* {data.map(data => (
                   <h6 key={data.id}>
                    {data.is_cancelled}</h6>))} */}
            {newdata2.map(newdata2 => (
                    <MDBBtn key={newdata2.id} size='sm' style={{marginLeft: '0%', marginRight: '0%', marginTop: '10%', width: '100%'}} href="/enrolledclass">
                    Enrol</MDBBtn>))}
         

          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <div className='ms-3'>
               {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.name}</h6>))}
                <p className='fw-bold mb-1'></p>
              </div>
            </div>
          </td>
          <td>
          {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.coach}</h6>))}

          </td>
          <td style={{marginLeft: '0%', marginRight: '0%', marginTop: '10%', width: '200px  '}}>
            {/* <MDBBadge color='success' pill>
              Active
            </MDBBadge> */}
            {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.description}</h6>))}

          </td>
          <td>
          {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.capacity}</h6>))}

          </td>
          <td>
          {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.space_available}</h6>))}

          </td>
          <td>
            {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.day}</h6>))}

          </td>
          <td>
          {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.start_time}</h6>))}

          </td>
          <td>
          {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.end_time}</h6>))}

          </td>
          <td>
          {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.start_date}</h6>))}

          </td>
          <td>
          {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.end_date}</h6>))}

          </td>
          <td>
          {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.length}</h6>))}

          </td>
          <td>
          {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.studio}</h6>))}

          </td>
          <td>
          {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.is_cancelled}</h6>))}

          </td>
          <td>
          {newdata3.map(newdata3 => (
                   <h6 key={newdata3.id}>
                    {newdata3.is_enrolled}</h6>))}

          </td>
          <td>
          {/* {data.map(data => (
                   <h6 key={data.id}>
                    {data.is_cancelled}</h6>))} */}
            {newdata3.map(newdata3 => (
                    <MDBBtn key={newdata3.id} size='sm' style={{marginLeft: '0%', marginRight: '0%', marginTop: '10%', width: '100%'}} href="/enrolledclass">
                    Enrol</MDBBtn>))}
         

          </td>
          <td>
          </td>
        </tr>
        </MDBTableBody>
    </MDBTable>
                   {/* <ul>
                   {data.map(data => (
                   <li key={data.id}>
                    <title>{data.name}</title>
                   <h1>{data.description}</h1>
                   <h1>{data.capacity}</h1>
                   <h1>{data.space_available}</h1>
                   <h1>{data.day}</h1>
                   <h1>{data.start_time}</h1>
                   <h1>{data.end_time}</h1>
                   <h1>{data.start_date}</h1>
                   <h1>{data.end_date}</h1>
                   <h1>{data.is_cancelled}</h1>
                   <h1>{data.is_enrolled}</h1>
                   <h1>{data.studio}</h1>
                   </li>

                    ))}
                    
                    </ul>            */}
                </>
    
      )

}


// const ClassesPage = () => {
   
//     const [classes, setClasses] = useState(null);
    
//     const getData = async () => {
    
        
//         const classesReponse = await fetch('http://127.0.0.1:8000/classes/classes-view/')
//         const classesData =  await classesReponse.json()
//         setClasses(classesData)

//         console.log(classesData)
//     }
//     useEffect(() => {
//         getData()
//       }, [])
    

//     return (
//         <>

//                       {/* <h1>{classes.coach}</h1> */}
                        
//         </>
//     )
// }

export default UsingFetch;
// // const Classes = () => {
// //   return (
// //     <div
// //       style={{
// //         display: 'flex',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         height: '90vh'
// //       }}
// //     >
// //       <h1>Classes</h1>
// //     </div>
// //   );
// // };

// // export default Classes;

// const UsingFetch = () => {
//     const [users, setUsers] = useState([])
  
//     const fetchData = () => {
//       fetch("http://127.0.0.1:8000/classes/classes-view/")
//         .then(response => {
//           return response.json()
//         })
//         .then(data => {
//           setUsers(data)
//         })
//     }
  
//     useEffect(() => {
//       fetchData()
//     }, [])
  
//     return (
//       <div>
//           <ul>
//             {users.map(user => user)}
//           </ul>
//       </div>
//     )
//   }

