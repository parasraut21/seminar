
import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import './Guide_review2.css';
import { useSelector, useDispatch } from 'react-redux';


function Guide_review2() {
  const [email, setEmail] = useState('');
  const [filename, setFilename] = useState('');
  const [pptBuffer, setPptBuffer] = useState(null);
  const [marks, setMarks] = useState(null);
  

  const [pairs, setPairs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/get-pair')
      .then(response => response.json())
      .then(data => setPairs(data))
      .catch(error => console.error(error));
      
  }, []);
  const userEmails = pairs.map(pair => pair.student_email);
  const [userEmail] = userEmails
  console.log(userEmail)
  const guideEmail = pairs.map(pair => pair.guide_email);
  
  const [pptData, setPptData] = useState([]);
 
  useEffect(() => {
    fetch('http://localhost:5000/getppt3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, filename: 'Seminar.pptx' })
    }).then(response => response.json())
      .then(data => {
        setPptData(data);
      })
      .catch(error => console.log(error));
  }, []);

  function handleDownload() {
    if (pptBuffer) {
      const url = window.URL.createObjectURL(new Blob([pptBuffer]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  function handleMarksSubmit(e) {
    e.preventDefault();
    // Send marks data to server
    fetch('http://localhost:5000/entermarks3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, marks: marks })
    }).then(response => {console.log(response); alert("marks alloted successfully")})
      .catch(error => console.log(error));
  }
  return (
    <Container>
      <Row>
        <Col>
          <h1>Review 3 (Guide)</h1>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Filename</th>
            <th>Download</th>
            <th>Enter Marks</th>
          </tr>
        </thead>
       <tbody>
  {pptData.map((data, index) => (
    <tr key={index}>
      <td>{userEmail}</td>
      <td>{data.filename}</td>
      <td>
        {data.pptBuffer && (
          <Button variant="success" onClick={() => handleDownload(data.pptBuffer, data.filename)}>
            Download
          </Button>
        )}
      </td>
      <td>
        <Form onSubmit={(e) => handleMarksSubmit(e, userEmail)}>
          <Form.Group controlId="marks">
            <Form.Control type="number" onChange={(e) => setMarks(e.target.value)} />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </td>
    </tr>
  ))}
</tbody>
      </Table>
    </Container>
  );
}

export default Guide_review2;