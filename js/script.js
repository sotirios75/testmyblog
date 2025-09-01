// Περιμένουμε να φορτωθεί πλήρως το περιεχόμενο της σελίδας πριν ξεκινήσει οποιαδήποτε λειτουργία
document.addEventListener('DOMContentLoaded', () => {

  // ----------------------- ΕΜΦΑΝΙΣΗ ΣΤΟΙΧΕΙΩΝ ΚΑΤΑ ΤΟ SCROLL -----------------------

  // Επιλέγουμε όλα τα στοιχεία με την κλάση .animated
  const animatedElements = document.querySelectorAll('.animated');

  // Συνάρτηση που αποκαλύπτει τα στοιχεία μόλις μπουν στο ορατό μέρος της οθόνης (viewport)
  const revealOnScroll = () => {
    animatedElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      // Αν η κορυφή του στοιχείου είναι κοντά στην προβολή της οθόνης, το εμφανίζουμε
      if (elementTop < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  };

  // Κάθε φορά που ο χρήστης κάνει scroll, καλούμε τη revealOnScroll
  window.addEventListener('scroll', revealOnScroll);
  // Επίσης την καλούμε αμέσως για ό,τι είναι ήδη στην οθόνη
  revealOnScroll();


// ----------------------- ΦΟΡΜΑ ΕΠΙΚΟΙΝΩΝΙΑΣ -----------------------

  /// Επιλέγουμε τη φόρμα (το πρώτο <form> που βρίσκει στο έγγραφο)
const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Μπλοκάρουμε το default submit

    // Παίρνουμε τα πεδία
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');

    // Έλεγχοι validation
    if (!name.value.trim()) {
      alert("❌ Παρακαλώ εισάγετε το όνομά σας.");
      name.focus();
      return;
    }

    if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
      alert("❌ Παρακαλώ εισάγετε έγκυρο email.");
      email.focus();
      return;
    }

    if (!message.value.trim()) {
      alert("❌ Παρακαλώ εισάγετε το μήνυμά σας.");
      message.focus();
      return;
    }

    // Αν όλα είναι ΟΚ
    alert("✅ Το μήνυμά σας εστάλη επιτυχώς!");
    form.reset();
  });
}


  // ----------------------- ΜΕΤΡΗΤΗΣ ΧΑΡΑΚΤΗΡΩΝ -----------------------

  // Επιλέγουμε το πεδίο μηνύματος με id="message"
  const messageBox = document.getElementById('message');

  if (messageBox) {
    // Δημιουργούμε ένα νέο <div> που θα δείχνει τον μετρητή
    const counter = document.createElement('div');
    counter.style.fontSize = '0.9em';
    counter.style.marginTop = '5px';

    // Το προσθέτουμε κάτω από το πεδίο εισαγωγής μηνύματος
    messageBox.parentElement.appendChild(counter);

    // Κάθε φορά που αλλάζει το περιεχόμενο του πεδίου, ενημερώνουμε τον μετρητή
    messageBox.addEventListener('input', () => {
      const length = messageBox.value.length;
      counter.textContent = `Χαρακτήρες: ${length}/500`;
    });
  }

  // ----------------------- ΚΟΥΜΠΙ SCROLL TO TOP -----------------------

  // Δημιουργούμε ένα νέο κουμπί για scroll προς τα πάνω
  const topBtn = document.createElement('button');
  topBtn.textContent = '⏫'; // Κείμενο του κουμπιού
  topBtn.classList.add('scroll-top-btn'); // Κλάση για styling (CSS)
  document.body.appendChild(topBtn); // Το προσθέτουμε στο σώμα της σελίδας

  // Εμφάνιση/Απόκρυψη του κουμπιού ανάλογα με το πόσο έχουμε κάνει scroll
  window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 50 ? 'block' : 'none';
  });

  // Όταν πατάμε το κουμπί, κάνουμε scroll ομαλά στην κορυφή της σελίδας
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ----------------------- ΚΟΥΜΠΙ DARK MODE -----------------------

  // Επιλέγουμε το κουμπί αλλαγής θέματος (dark/light mode)
  const darkToggle = document.getElementById('darkModeToggle');

  if (darkToggle) {
    // Κάθε φορά που πατιέται το κουμπί, προσθέτουμε/αφαιρούμε την κλάση dark-mode
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }
});

// Επιλέγουμε το input πεδίο αναζήτησης
  const searchInput = document.getElementById('searchInput');

  // Επιλέγουμε το container που περιέχει το κείμενο όπου θα ψάξουμε
  const content = document.getElementById('content');

  // Προσθέτουμε event listener ώστε να ενεργοποιείται κάθε φορά που ο χρήστης γράφει κάτι
  searchInput.addEventListener('input', () => {
    // Παίρνουμε την τιμή που έχει πληκτρολογήσει ο χρήστης
    const query = searchInput.value.toLowerCase();

    // Επιλέγουμε όλα τα <p> στοιχεία μέσα στο container
    let paragraphs = content.querySelectorAll('p');

    // Ελέγχουμε κάθε παράγραφο ξεχωριστά
    paragraphs.forEach(p => {
      // Αποθηκεύουμε το αρχικό κείμενο της παραγράφου (χωρίς markup)
      const originalText = p.textContent;
      
      // Αν υπάρχει αναζήτηση (δηλαδή αν ο χρήστης έχει γράψει κάτι)
      if (query.length > 0) {
        // Δημιουργούμε μια κανονική έκφραση (regex) για να βρούμε το query στο κείμενο
        // 'gi' σημαίνει: global (όλες οι εμφανίσεις) + case insensitive (χωρίς διάκριση πεζών/κεφαλαίων)
        const regex = new RegExp(`(${query})`, 'gi');

        // Αντικαθιστούμε τα ταιριαστά κομμάτια με το ίδιο κείμενο τυλιγμένο σε <mark>
        // ώστε να εμφανιστεί με κίτρινο highlight
        p.innerHTML = originalText.replace(regex, `<mark>$1</mark>`);
      } else {
        // Αν το πεδίο είναι άδειο, επιστρέφουμε το κείμενο στην αρχική του μορφή
        p.innerHTML = originalText;
      }
    });
  });