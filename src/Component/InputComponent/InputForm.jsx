import { Form } from "react-bootstrap";

const InputForm = (props) => {
    return (
        <Form.Group className="mb-3" controlId={props.name}>
            <Form.Label className="fw-bold text-dark">{props.label}</Form.Label>
            <Form.Control
                className="text-dark bg-transparent border-secondary"
                placeholder={props.placeholder || props.label}
                {...props}
            />
        </Form.Group>
    );
};

export default InputForm;