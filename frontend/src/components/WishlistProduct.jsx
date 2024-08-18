import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export default function WishlistProduct({product}){
    return(
        <div className="card mb-3 mx-2 height_set" style={{ width: "18rem" }}>
            <img
              src={product?.imgUrl}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{product?.name}</h5>
              
              <p className="card-text mb-1">$ {product?.price}</p>
              <div className="card-text mb-4">
                <FontAwesomeIcon icon={faStar} />   {product?.ratingAverage} ({product?.ratingCount} Reviews)
              </div>
              <div className="card-text mb-2">
                <button className="btn btn-light grey">Add to cart</button>
              </div>
              <div className="card-text">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
    )
}