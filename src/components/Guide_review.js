import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Model from './Model';

import Guide_review2 from './Guide_review2';
import Guide_review3 from './Guide_review3';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';


function Guide_review() {
  const guideEmail = localStorage.getItem('guideEmail')
  const [review2, setReview2] = useState(false);
  const [review3, setReview3] = useState(false);
  const navigate = useNavigate();


  //

  const signUp = () => {
    navigate('/prelogin');
  };

  //open 2
  const openReview2 = () => {
    setReview2(true);
  };

  const closeReview2 = () => {
    setReview2(false);
  };

   //open 3
   const openReview3 = () => {
    setReview3(true);
  };

  const closeReview3 = () => {
    setReview3(false);
  };
  return (
    <>
   <Navbar _email={guideEmail}/>

      <Container fluid>
        <div
          className="container-fluid"
          style={{
            backgroundImage: 'url(bg-mit.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100vh',
            width: '100vw',
            position: 'relative',
            marginTop: '0px',
          }}
        >
          <div
            className="btn bg-white text-success mx-1 mr-0 p"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <h1>MIT-WPU (Guide)</h1>
            <hr />
            <Row className="justify-content-center mt-5">
              <Col md={4}>
                <Card className="login-card "style={{ backgroundColor: '#194d33', color: 'white' }} >
                  <Card.Body>
                    <Card.Title  onClick={openReview2} style={{ fontSize: '1rem', marginBottom: '1rem', cursor: 'pointer' }}>See Review 2</Card.Title>
                    {review2 ? (
                      <Model onClose={closeReview2}>
                        <Guide_review2 />
                      </Model>
                    ) : null}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="login-card"style={{ backgroundColor: '#194d33', color: 'white' }}>
                  <Card.Body>
                    <Card.Title onClick={openReview3} style={{ fontSize: '1rem', marginBottom: '1rem', cursor: 'pointer' }}>See Review 3</Card.Title>
                    {review3 ? (
                      <Model onClose={closeReview3}>
                        <Guide_review3 />
                      </Model>
                    ) : null}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <hr />
            <button
              onClick={signUp}
              type="submit"
              className="btn btn-warning"
            >
              Login
            </button>
          </div>
        </div>
        <style jsx>{`
          .card {
            background-color: #fff;
            border: 1px solid #eee;
            border-radius: 10px;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }

          .card:hover {
            transform: scale(1.02);
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          }

          .card-body {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: #194d33;
            color: white;
            
          }

          .card-title {
            font-size: 20px;
          margin-bottom: 10px;
        }
        
        .removeitbtn {
          display: flex;
          justify-content: flex-end;
        }
        
        button {
          background-color: #5cb85c;
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out;
        }
        
        button:hover {
          background-color: #4cae4c;
        }
      `}</style>
        </Container>
        </>
  )}

export default Guide_review;