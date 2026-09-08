import { useEffect, useState } from "react";
import LensCard from "../components/LensCard";
import InspirationGallery from "../components/InspirationGallery";

function Home() {
  const [lenses, setLenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLenses = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/c/bf7d-168d-46eb-a30a",
        );

        if (!response.ok) {
          throw new Error("Unable to load lenses");
        }

        const data = await response.json();
        setLenses(data.lenses);
      } catch (error) {
        console.error("Error fetching lenses:", error);
        setError("Sorry, we couldn't load the lens collection.");
      } finally {
        setLoading(false);
      }
    };

    fetchLenses();
  }, []);

  const filteredLenses = lenses.filter((lens) => {
    const search = searchTerm.toLowerCase();

    return (
      lens.name.toLowerCase().includes(search) ||
      lens.brand.toLowerCase().includes(search) ||
      lens.type.toLowerCase().includes(search) ||
      lens.bestFor.toLowerCase().includes(search)
    );
  });

  const sortedLenses = [...filteredLenses].sort((a, b) => {
    if (sortOption === "priceLow") {
      return a.price - b.price;
    }

    if (sortOption === "priceHigh") {
      return b.price - a.price;
    }

    if (sortOption === "brand") {
      return a.brand.localeCompare(b.brand);
    }

    return 0;
  });

  return (
    <section className="home">
      <div className="home__hero">
        <p className="home__eyebrow">Camera Lens Rentals</p>

        <h1>Rent the right lens for every moment.</h1>

        <p className="home__intro">
          Explore lenses for portraits, travel, sports, wildlife, events, and
          everything in between.
        </p>

        <div className="home__search">
          <input
            type="text"
            placeholder="Search by lens, brand, or photography style..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <button
            type="button"
            onClick={() => {
              document.getElementById("lenses")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Search
          </button>
        </div>
      </div>

      <section className="home__lenses" id="lenses">
        <div className="sectionHeading">
          <div>
            <p className="sectionHeading__eyebrow">Browse the collection</p>

            <h2>Find Your Lens</h2>
          </div>

          <div className="sortControl">
            <label htmlFor="sort">Sort by:</label>

            <select
              id="sort"
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
            >
              <option value="default">Featured</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="brand">Brand: A–Z</option>
            </select>
          </div>
        </div>

        {filteredLenses.length > 0 ? (
          <div className="lensGrid">
            {sortedLenses.map((lens) => (
              <LensCard key={lens.id} lens={lens} />
            ))}
          </div>
        ) : (
          <p className="noResults">No lenses found. Try another search.</p>
        )}
      </section>
      <InspirationGallery searchTerm={searchTerm} />
    </section>
  );
}

export default Home;
