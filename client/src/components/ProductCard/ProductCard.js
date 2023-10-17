import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TaskImage from '../../images/default-task.jpg'
import Moment from 'react-moment';

function ProductCard({ params }) {
    return (
        <Card className='m-0 mb-3'>
            <Link className="card-image" to={`/categories/${params.category}/${params._id}/details`}>
                <Card.Img variant="top" src={TaskImage} />
            </Link>
            <Card.Footer className='border-0'>
                <small className="text-muted">
                    <Moment format="d MMM YYYY (dddd) HH:mm">
                        {params.date}
                    </Moment>
                </small>
                <Card.Body>
                    <Card.Title className="d-block pt-2 text-left">{params.title}</Card.Title>
                    <Card.Text className="d-block text-left">{params.description}</Card.Text>
                </Card.Body>
            </Card.Footer>
        </Card>
    )
}

export default ProductCard;