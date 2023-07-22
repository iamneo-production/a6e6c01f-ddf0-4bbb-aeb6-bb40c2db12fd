import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';

export default function FilterModal(props) {
  const categoryProductResult = props.categoryProductResult;
  const brands = Array.from(new Set(categoryProductResult.map(item => item.brand)));
  const colors = Array.from(new Set(categoryProductResult.map(item => item.colour)));
  return (
    <div>
      <Offcanvas style={{ width: '220px' }} placement={'end'} show={props.show} onHide={() => props.onHide()}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><b>Filter</b></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <h6>Brand</h6>
            {brands.map((brand) => (
                <Form.Check
                    key={brand}
                    type="checkbox"
                    id={brand}
                    label={brand}
                    onChange={() => props.onBrandFilterChange(brand)}
                />
            ))}
          </div>
          <div>
            <h6>Color</h6>
            {colors.map((color) => (
                <Form.Check
                    key={color}
                    type="checkbox"
                    id={color}
                    label={color}
                    onChange={() => props.onColorFilterChange(color)}
                />
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
