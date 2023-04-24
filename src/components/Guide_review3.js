import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import './Guide_review2.css';


function Guide_review3() {
  const [email, setEmail] = useState('');
  const [filename, setFilename] = useState('');
  const [pptBuffer, setPptBuffer] = useState(null);
  const [marks, setMarks] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/getppt3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'example@example.com', filename: 'Seminar.pptx' })
    }).then(response => response.json())
      .then(data => {
        setEmail(data.email);
        setFilename(data.filename);
        setPptBuffer(data.pptBuffer);
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
      body: JSON.stringify({ email: email, marks: marks })
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
          <tr>
            <td>{email}</td>
            <td>{filename}</td>
            <td>
              {pptBuffer && (
                <Button variant="success" onClick={handleDownload}>
                  Download
                </Button>
              )}
            </td>
            <td>
              <Form onSubmit={handleMarksSubmit}>
                <Form.Group controlId="marks">
                  <Form.Control type="number" onChange={e => setMarks(e.target.value)} />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default Guide_review3;