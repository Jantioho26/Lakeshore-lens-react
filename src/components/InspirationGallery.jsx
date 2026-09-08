import { useEffect, useState } from "react";

function InspirationGallery({ searchTerm }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);

      const query = searchTerm.trim() || "photography";

      try {
       const response = await fetch(
  `/api/pexels?query=${encodeURIComponent(query)}`
);

        const data = await response.json();

        setPhotos(data.photos || []);
      } catch (error) {
        console.error("Error fetching Pexels photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [searchTerm]);

  return (
    <section className="inspiration">
      <div className="inspiration__heading">
        <p className="sectionHeading__eyebrow">
          Photography Inspiration
        </p>

        <h2>See What You Can Create</h2>

        <p>
          Explore photography inspiration based on your search.
        </p>
      </div>

      {loading ? (
        <p className="inspiration__message">
          Loading inspiration...
        </p>
      ) : (
        <div className="inspirationGrid">
          {photos.map((photo) => (
            <article className="inspirationCard" key={photo.id}>
              <img
                src={photo.src.large}
                alt={photo.alt || "Photography inspiration"}
              />

              <div className="inspirationCard__content">
                <p>
                  Photo by{" "}
                  <a
                    href={photo.photographer_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {photo.photographer}
                  </a>
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      <a
        className="pexelsCredit"
        href="https://www.pexels.com"
        target="_blank"
        rel="noreferrer"
      >
        Photos provided by Pexels
      </a>
    </section>
  );
}

export default InspirationGallery;