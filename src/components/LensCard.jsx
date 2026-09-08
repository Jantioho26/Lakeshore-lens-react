import { Link } from "react-router-dom";

function LensCard({ lens }) {
  return (
    <article className="lensCard">
      <div className="lensCard__imageWrapper">
        <img src={lens.image} alt={lens.name} className="lensCard__image" />
      </div>

      <div className="lensCard__content">
        <div className="lensCard__top">
          <span className="lensCard__brand">{lens.brand}</span>
          <span className="lensCard__type">{lens.type}</span>
        </div>

        <h3>{lens.name}</h3>

        <p className="lensCard__bestFor">Best for: {lens.bestFor}</p>

        <div className="lensCard__bottom">
          <p className="lensCard__price">
            <strong>${lens.price}</strong> / day
          </p>

          <Link to={`/lens/${lens.id}`} className="lensCard__button">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default LensCard;
