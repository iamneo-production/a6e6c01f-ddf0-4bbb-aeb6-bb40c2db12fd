import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';

export default function FilterModal(props) {
  return (
    <div>
      <Offcanvas style={{ width: '220px' }} placement={'end'} show={props.show} onHide={() => props.onHide()}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><b>Filter</b></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <h6>Brand</h6>
            <Form.Check type="checkbox" id="brand1" label="Brand 1" />
            <Form.Check type="checkbox" id="brand2" label="Brand 2" />
            <Form.Check type="checkbox" id="brand3" label="Brand 3" />
            <Form.Check type="checkbox" id="brand4" label="Brand 4" />
            <Form.Check type="checkbox" id="brand5" label="Brand 5" />
          </div>
          <div>
            <h6>Color</h6>
            <Form.Check type="checkbox" id="color1" label="Color 1" />
            <Form.Check type="checkbox" id="color2" label="Color 2" />
            <Form.Check type="checkbox" id="color3" label="Color 3" />
            <Form.Check type="checkbox" id="color4" label="Color 4" />
            <Form.Check type="checkbox" id="color5" label="Color 5" />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
