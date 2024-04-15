import { Container, Stack, Table, Spinner, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";

const HomecookView = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    return(
        <Container>
            <Stack direction="horizontal" gap={3} className="mb-3">
                <h1 className="h4 fw-bold mb-0 text-nowrap">My Videos</h1>
                <hr className="border-top border-light w-100" />
                <div className="ms-auto text-nowrap">

                </div>
            </Stack>
        </Container>
    );
};

export default HomecookView;