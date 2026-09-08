import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function LensDetails() {
  const { id } = useParams();

  const [lens, setLens] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLens = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          "https://dummyjson.com/c/bf7d-168d-46eb-a30a",
        );

        if (!response.ok) {
          throw new Error("Unable to load lens");
        }

        const data = await response.json();

        const selectedLens = data.lenses.find((item) => item.id === Number(id));

        setLens(selectedLens || null);
      } catch (error) {
        console.error("Error fetching lens:", error);
        setError("Sorry, we couldn't load this lens.");
      } finally {
        setLoading(false);
      }
    };

    fetchLens();
  }, [id]);

  if (loading) {
    return (
      <section className="lensDetails">
        <p>Loading lens details...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="lensDetails">
        <h2>{error}</h2>
        <Link to="/" className="backButton">
          Back to Home
        </Link>
      </section>
    );
  }

  if (!lens) {
    return (
      <section className="lensDetails">
        <h2>Lens not found</h2>
        <Link to="/" className="backButton">
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="lensDetails">
      <div className="lensDetails__container">
        <div className="lensDetails__imageWrapper">
          <img
            src={lens.image}
            alt={lens.name}
            className="lensDetails__image"
          />
        </div>

        <div className="lensDetails__content">
          <p className="lensDetails__brand">{lens.brand}</p>

          <h1>{lens.name}</h1>

          <p className="lensDetails__bestFor">Best for: {lens.bestFor}</p>

          <div className="lensDetails__info">
            <p>
              <strong>Focal Length:</strong> {lens.focalLength}
            </p>

            <p>
              <strong>Type:</strong> {lens.type}
            </p>

            <p>
              <strong>Rental Price:</strong> ${lens.price} / day
            </p>
          </div>

          <p className="lensDetails__description">{lens.description}</p>

          <Link to="/#lenses" className="backButton">
            Back to Lenses
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LensDetails;
