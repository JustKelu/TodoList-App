import '../styles/home.css'
import { useAuth } from '../context/AuthContexts';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
export default function Home() {
    const { isSignIn } = useAuth();
    const navigate = useNavigate();
    const featuresSection = useRef(null);

    const handlePrimaryBtn = () => {
        isSignIn ? navigate('/todos') : navigate("/login");
    }

    const handleInfoBtn = () => {
        featuresSection.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <main>
            {/* Hero Section */}
            <section className="hero">
                <header>
                    <h1>Organizza la tua giornata</h1>
                    <p>La migliore app per gestire le tue attività quotidiane in modo semplice ed efficace.</p>
                </header>
                <div className="hero-actions">
                    <button className="btn-primary" onClick={handlePrimaryBtn}>Inizia ora</button>
                    <button className="btn-secondary" onClick={handleInfoBtn}>Scopri di più</button>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" ref={featuresSection}>
                <header>
                    <h2>Perché scegliere la nostra app?</h2>
                    <p>Tutto quello che ti serve per essere più produttivo</p>
                </header>
                
                <div className="features-grid">
                    <article className="feature">
                        <header>
                            <h3>Facile da usare</h3>
                        </header>
                        <p>Interfaccia intuitiva e design pulito per una esperienza utente ottimale.</p>
                    </article>

                    <article className="feature">
                        <header>
                            <h3>Sempre sincronizzato</h3>
                        </header>
                        <p>Accedi ai tuoi task da qualsiasi dispositivo, sempre aggiornati in tempo reale.</p>
                    </article>

                    <article className="feature">
                        <header>
                            <h3>Collaborazione</h3>
                        </header>
                        <p>Condividi le tue liste e collabora con il tuo team in modo efficace.</p>
                    </article>

                    <article className="feature">
                        <header>
                            <h3>Notifiche smart</h3>
                        </header>
                        <p>Ricevi promemoria intelligenti per non perdere mai una scadenza importante.</p>
                    </article>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats">
                <header>
                    <h2>I numeri che contano</h2>
                </header>
                
                <div className="stats-grid">
                    <div className="stat">
                        <strong>10,000+</strong>
                        <span>Utenti attivi</span>
                    </div>
                    <div className="stat">
                        <strong>50,000+</strong>
                        <span>Task completati</span>
                    </div>
                    <div className="stat">
                        <strong>99.9%</strong>
                        <span>Uptime</span>
                    </div>
                    <div className="stat">
                        <strong>4.8/5</strong>
                        <span>Rating utenti</span>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <header>
                    <h2>Cosa dicono i nostri utenti</h2>
                </header>
                
                <div className="testimonials-grid">
                    <blockquote className="testimonial">
                        <p>"Finalmente un'app che mi aiuta davvero a organizzare la mia giornata. Semplicissima da usare!"</p>
                        <cite>
                            <strong>Maria Rossi</strong>
                            <span>Designer</span>
                        </cite>
                    </blockquote>

                    <blockquote className="testimonial">
                        <p>"La sincronizzazione tra dispositivi è perfetta. Non posso più farne a meno."</p>
                        <cite>
                            <strong>Luca Bianchi</strong>
                            <span>Sviluppatore</span>
                        </cite>
                    </blockquote>

                    <blockquote className="testimonial">
                        <p>"Ottima per la collaborazione in team. Ci ha migliorato la produttività del 40%."</p>
                        <cite>
                            <strong>Anna Verdi</strong>
                            <span>Project Manager</span>
                        </cite>
                    </blockquote>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <header>
                    <h2>Pronto per iniziare?</h2>
                    <p>Unisciti a migliaia di utenti che hanno già migliorato la loro produttività</p>
                </header>
                <div className="cta-actions">
                    <button className="btn-primary" onClick={() => navigate('/login')}>Registrati gratis</button>
                    <small>Nessuna carta di credito richiesta</small>
                </div>
            </section>
        </main>
    )
}