// Slider functionality
let currentSlideIndex = 0;
showSlide(currentSlideIndex);

function showSlide(index) {
  const slides = document.getElementsByClassName("slide");
  if (index >= slides.length) {
    currentSlideIndex = 0;
  }
  if (index < 0) {
    currentSlideIndex = slides.length - 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[currentSlideIndex].style.display = "block";
}

function moveSlide(step) {
  currentSlideIndex += step;
  showSlide(currentSlideIndex);
}

// Auto-slide feature
setInterval(() => {
  moveSlide(1);
}, 5000);

function handleLoginResponse(response) {
  const { token, role, userName } = response;

  // Store token, role, and userName in localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("userName", userName);

  // Redirect to the homepage after login
  window.location.href = "index.html";
}

// Authentication functions
function handleLogout() {
  // Clear all authentication data
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userName");

  // Redirect to login page
  window.location.href = "login.html";
}
// Check authentication status
function isAuthenticated() {
  return !!localStorage.getItem("token");
}

// Get user name
function getUserName() {
  return localStorage.getItem("userName") || "User";
}

// Header Component
class myHeader extends HTMLElement {
  connectedCallback() {
    const isLoggedIn = isAuthenticated();
    const userName = getUserName();

    // Create the login/user section HTML based on login status
    const loginSection = isLoggedIn
      ? `
<div class="user-section">
            <span class="user-name">Welcome</span>
          <button onclick="handleLogout()" class="logout-btn">Logout</button>
        </div>
      `
      : `
        <div class="login-btn">
          <a href="login.html">Login/SignUp</a>
        </div>
      `;

    this.innerHTML = `
      <header>
        <div class="header-container">
            <div class="logo">
                <a href="index.html"><img src="/images/logo.png" alt="Travel & Tourism Logo"></a>
            </div>

            <nav class="navbar">
                <ul class="nav-container">
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Category ▼</a>
                        <ul class="sub-dropdown">
                            <li class="sub-dropbtn"><a href="stay.html">Stay</a>
                                <ul class="sub-menu">
                                    <li><a href="/hotel.html">Hotel</a></li>
                                    <li><a href="/motel.html">Motel</a></li>
                                    <li><a href="/resort.html">Resort</a></li>
                                    <li><a href="/home.html">Home Stay</a></li>
                                    <li><a href="/cottage.html">Cottage</a></li>
                                    <li><a href="/private.html">Private Homes</a></li>
                                </ul>
                            </li>
                            <li class="sub-dropbtn"><a href="/travel.html">Travel</a>
                                <ul class="sub-menu">
                                    <li><a href="/bus.html">Bus</a></li>
                                    <li><a href="/train.html">Train</a></li>
                                    <li><a href="/flight.html">Flight</a></li>
                                    <li><a href="/taxi.html">Taxi</a></li>
                                </ul>
                            </li>
                            <li class="sub-dropbtn"><a href="/package.html">Packages</a>
                                <ul class="sub-menu">
                                    <li><a href="/kashmir.html">Kashmir</a></li>
                                    <li><a href="/manali.html">Manali</a></li>
                                    <li><a href="/shimla.html">Shimla</a></li>
                                    <li><a href="/darjeeling.html">Darjeeling</a></li>
                                    <li><a href="/ladakh.html">Ladakh</a></li>
                                    <li><a href="/goa.html">Goa</a></li>
                                    <li><a href="/UP.html">UP</a></li>
                                    <li><a href="/jaipur.html">Jaipur</a></li>
                                    <li><a href="/ooty.html">Ooty</a></li>
                                </ul>
                            </li>
                            <li class="sub-dropbtn"><a href="/rental.html">Rental</a>
                                <ul class="sub-menu">
                                    <li><a href="/car.html">Car</a></li>
                                    <li><a href="/motorcycle.html">Motorcycle</a></li>
                                    <li><a href="/ADV.html">ADV</a></li>
                                    <li><a href="/quads.html">Quads</a></li>
                                </ul>
                            </li>
                            <li class="sub-dropbtn"><a href="/activities.html">Activities</a>
                                <ul class="sub-menu">
                                    <li><a href="/adventure.html">Adventure</a></li>
                                    <li><a href="/water.html">Water Sports</a></li>
                                    <li><a href="/sight.html">Sight Seeing</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </nav>

            <button class="cart-btn">
                <a href="cart.html"><img src="/images/cart-icon.png" alt="Cart Icon"></a>
                <span id="cart-count">0</span>
            </button>

            ${loginSection}
        </div>
      </header>
    `;
  }
}

customElements.define("my-header", myHeader);

class myFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer class="site-footer">
        <div class="logo2">
            <a href="index.html"><img src="/images/logo.png" alt="Travel & Tourism Logo"></a>
        </div>
    <div class="footer-content">
        <div class="footer-links">
            
            <h3>Quick Links</h3>
            <ul>
                <li><a href="/html/stay.html">Stay</a></li>
                <li><a href="/html/travel.html">Travel</a></li>
                <li><a href="/html/package.html">Package</a></li>
                <li><a href="/html/rental.html">Rental</a></li>
                <li><a href="/html/activities.html">Activities</a></li>
                <li><a href="/html/about.html">About Us</a></li>
                <li><a href="/html/contact.html">Contact Us</a></li>
            </ul>
        </div>
        
        <div class="footer-terms">
            <h3>Terms & Policies</h3>
            <ul>
                <li><a href="/html/privacy-policy.html">Privacy Policy</a></li>
                <li><a href="/html/terms-and-conditions.html">Terms & Conditions</a></li>
                <li><a href="/html/refund-policy.html">Refund Policy</a></li>
                <li><a href="/html/shipping-policy.html">Shipping Policy</a></li>
            </ul>
        </div>
        
        <div class="footer-contact">
            <h3>Contact Us</h3>
            <a href="mailto:support@travelntourism.com">Email: support@travelntourism.com</a>
            <p>Phone: +1 (123) 456-7890</p>
            <a href="https://www.google.com/maps/place/Allenare+Technology+Private+Limited/@22.7668801,88.3748032,17z/data=!3m1!4b1!4m6!3m5!1s0x39f89b1013862b09:0xa4337fb26848e87!8m2!3d22.7668752!4d88.3773781!16s%2Fg%2F11w1rbgfdc?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D">Address: 123 Tour Street, Travel City, TT 12345</a>
        </div>
    </div>
    
    <div class="footer-bottom">
        <p>&copy; 2024 Travel & Tourism. All rights reserved.</p>
    </div>
    </footer>
        `;
  }
}

customElements.define("my-footer", myFooter);

function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function navigateToCity(cityName) {
  alert(`Navigating to ${cityName} page...`);
}

// Scroll behavior for header
const scroll_color = document.getElementById("scroll_color");

window.addEventListener("scroll", () => {
  if (window.scrollY > 25) {
    scroll_color.classList.add("scrolled");
  } else {
    scroll_color.classList.remove("scrolled");
  }
});
