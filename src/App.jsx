
import { useState } from "react";
import {
  CarFront,
  MapPin,
  Phone,
  Mail,
  Search,
  Menu,
  X,
  CalendarDays,
  Fuel,
  Users,
  Settings2,
  ArrowRight,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import "./App.css";

const cars = [
  {
    id: 1,
    name: "Hyundai Creta",
    category: "SUV",
    price: 2500,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=900&q=80",
    description:
      "Comfortable SUV perfect for family trips and long journeys.",
  },
  {
    id: 2,
    name: "Mahindra Thar",
    category: "SUV",
    price: 3500,
    seats: 4,
    fuel: "Diesel",
    transmission: "Manual",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
    description:
      "Powerful off-road SUV for adventure and weekend trips.",
  },
  {
    id: 3,
    name: "Maruti Swift",
    category: "Hatchback",
    price: 1500,
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
    description:
      "Budget-friendly and easy to drive for city travel.",
  },
  {
    id: 4,
    name: "Toyota Innova Crysta",
    category: "MUV",
    price: 4000,
    seats: 7,
    fuel: "Diesel",
    transmission: "Manual",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80",
    description:
      "Spacious family vehicle with comfortable seating.",
  },
  {
    id: 5,
    name: "Hyundai Verna",
    category: "Sedan",
    price: 2200,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80",
    description:
      "Premium sedan with stylish looks and comfortable interiors.",
  },
  {
    id: 6,
    name: "Kia Seltos",
    category: "SUV",
    price: 3000,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80",
    description:
      "Modern SUV with premium comfort and stylish design.",
  },
];

const categories = ["All", "SUV", "Sedan", "Hatchback", "MUV"];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedCar, setSelectedCar] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    pickup: "",
    returnDate: "",
  });
  const [message, setMessage] = useState("");

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || car.category === category;

    return matchesSearch && matchesCategory;
  });

  function calculateDays() {
    if (!booking.pickup || !booking.returnDate) return 1;

    const start = new Date(booking.pickup);
    const end = new Date(booking.returnDate);

    const difference = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );

    return Math.max(difference, 1);
  }

  function handleBooking(e) {
    e.preventDefault();

    if (new Date(booking.returnDate) < new Date(booking.pickup)) {
      setMessage("Return date must be after pickup date.");
      return;
    }

    const days = calculateDays();
    const total = selectedCar.price * days;

    setMessage(
      `Booking request for ${selectedCar.name} received! ` +
      `Estimated price: ₹${total.toLocaleString("en-IN")}. ` +
      `Please contact the office to confirm your booking.`
    );
  }

  function openBooking(car) {
    setSelectedCar(car);
    setMessage("");
    setBooking({
      name: "",
      phone: "",
      pickup: "",
      returnDate: "",
    });
  }

  return (
    <div className="website">
      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#home" className="logo">
          <CarFront size={32} />
          <span>MG <b>SELF DRIVES</b></span>
        </a>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#cars" onClick={() => setMenuOpen(false)}>Our Cars</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#location" onClick={() => setMenuOpen(false)}>Location</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>

        <a href="#cars" className="nav-book">
          Book a Car
        </a>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="hero-tag">YOUR JOURNEY, OUR CARS</span>

          <h1>
            Drive Your
            <span> Dreams.</span>
          </h1>

          <p>
            Discover freedom on the road with MG Self Drives.
            Affordable prices, premium cars, and unforgettable journeys.
          </p>

          <div className="hero-buttons">
            <a href="#cars" className="primary-btn">
              Explore Cars <ArrowRight size={18} />
            </a>

            <a href="#location" className="secondary-btn">
              <MapPin size={18} /> Find Our Office
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <h3>6+</h3>
              <p>Car Models</p>
            </div>
            <div>
              <h3>24/7</h3>
              <p>Support</p>
            </div>
            <div>
              <h3>100%</h3>
              <p>Comfort</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="search-section">
        <div className="search-box">
          <Search size={22} />

          <input
            type="text"
            placeholder="Search your favorite car..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <a href="#cars" className="search-btn">
            Search Cars
          </a>
        </div>
      </section>

      {/* CARS */}
      <section className="cars-section" id="cars">
        <div className="section-heading">
          <span className="section-tag">OUR FLEET</span>
          <h2>Choose Your <span>Perfect Car</span></h2>
          <p>
            Find the right vehicle for your trip at affordable daily prices.
          </p>
        </div>

        <div className="categories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "category active" : "category"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="cars-grid">
          {filteredCars.map((car) => (
            <div className="car-card" key={car.id}>
              <div className="car-image">
                <img src={car.image} alt={car.name} loading="lazy" />
                <span className="car-category">{car.category}</span>
              </div>

              <div className="car-info">
                <h3>{car.name}</h3>
                <p className="car-description">{car.description}</p>

                <div className="car-details">
                  <span><Users size={16} /> {car.seats} Seats</span>
                  <span><Fuel size={16} /> {car.fuel}</span>
                  <span><Settings2 size={16} /> {car.transmission}</span>
                </div>

                <div className="car-footer">
                  <div className="price">
                    <h3>₹{car.price.toLocaleString("en-IN")}</h3>
                    <span>/ day</span>
                  </div>

                  <button
                    className="book-btn"
                    onClick={() => openBooking(car)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <p className="no-cars">No cars found. Try another search.</p>
        )}
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80"
            alt="Premium rental car"
            loading="lazy"
          />
        </div>

        <div className="about-content">
          <span className="section-tag">ABOUT OUR COMPANY</span>

          <h2>Your Trusted <span>Travel Partner</span></h2>

          <p>
            MG Self Drives provides convenient and affordable car rental
            services for city travel, family trips, business journeys,
            and weekend adventures.
          </p>

          <div className="about-points">
            <p><CheckCircle /> Affordable rental prices</p>
            <p><CheckCircle /> Clean and maintained vehicles</p>
            <p><CheckCircle /> Flexible rental durations</p>
            <p><CheckCircle /> Friendly customer support</p>
          </div>

          <a href="#contact" className="primary-btn">
            Contact Us <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* LOCATION */}
      <section className="location-section" id="location">
        <div className="section-heading">
          <span className="section-tag">VISIT OUR OFFICE</span>
          <h2>Find <span>Our Location</span></h2>
          <p>Visit our office for car rental assistance.</p>
        </div>

        <div className="location-container">
          <div className="location-details">
            <MapPin size={38} />

            <h3>MG Self Drives</h3>

            <p>
              Raparthinagar Colony,
              Khammam District,
              Telangana, India.
            </p>

            <a
              className="primary-btn"
              href="https://www.google.com/maps/search/?api=1&query=Raparthinagar+Khammam+Telangana"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions <ArrowRight size={18} />
            </a>
          </div>

          <div className="map">
            <iframe
              title="MG Self Drives Office Location"
              src="https://maps.google.com/maps?q=Raparthinagar%20Khammam%20Telangana&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="section-heading">
          <span className="section-tag">GET IN TOUCH</span>
          <h2>Contact <span>Our Team</span></h2>
          <p>Have questions? Reach out to us.</p>
        </div>

        <div className="contact-grid">
          <a href="tel:+919000000000" className="contact-card">
            <Phone />
            <h3>Phone Number</h3>
            <p>+91 90000 00000</p>
          </a>

          <a href="mailto:mgselfdrives@example.com" className="contact-card">
            <Mail />
            <h3>Email Address</h3>
            <p>mgselfdrives@example.com</p>
          </a>

         

<a
  href="https://www.instagram.com/mgselfdrives/"
  target="_blank"
  rel="noreferrer"
  className="contact-card"
>
  <FaInstagram className="instagram-icon" />

  <h3>Instagram</h3>

  <p>@mgselfdrives</p>
</a>



          <a
            href="https://wa.me/919000000000"
            target="_blank"
            rel="noreferrer"
            className="contact-card"
          >
            <MessageCircle />
            <h3>WhatsApp</h3>
            <p>Chat with us</p>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <a href="#home" className="logo">
          <CarFront size={28} />
          <span>MG <b>SELF DRIVES</b></span>
        </a>

        <p>Drive more. Worry less. Your journey starts here.</p>

        <p className="copyright">
          © {new Date().getFullYear()} MG Self Drives. All rights reserved.
        </p>
      </footer>

      {/* BOOKING MODAL */}
      {selectedCar && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCar(null)}
        >
          <div
            className="booking-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedCar(null)}
              aria-label="Close booking form"
            >
              <X />
            </button>

            <h2>Book {selectedCar.name}</h2>

            <p className="modal-price">
              ₹{selectedCar.price.toLocaleString("en-IN")} / day
            </p>

            <form onSubmit={handleBooking}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                value={booking.name}
                onChange={(e) =>
                  setBooking({ ...booking, name: e.target.value })
                }
              />

              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                required
                pattern="[0-9]{10}"
                value={booking.phone}
                onChange={(e) =>
                  setBooking({ ...booking, phone: e.target.value })
                }
              />

              <label>Pickup Date</label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={booking.pickup}
                onChange={(e) =>
                  setBooking({ ...booking, pickup: e.target.value })
                }
              />

              <label>Return Date</label>
              <input
                type="date"
                required
                min={booking.pickup || new Date().toISOString().split("T")[0]}
                value={booking.returnDate}
                onChange={(e) =>
                  setBooking({ ...booking, returnDate: e.target.value })
                }
              />

              <div className="total-price">
                Estimated Total: ₹
                {(selectedCar.price * calculateDays()).toLocaleString("en-IN")}
              </div>

              <button type="submit" className="primary-btn full-btn">
                Submit Booking Request
              </button>
            </form>

            {message && <p className="booking-message">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
