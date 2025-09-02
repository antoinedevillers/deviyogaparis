import ContactForm from '../components/ContactForm';
import WeeklyPlanning from '../components/WeeklyPlanning';
import Button from '../components/Button';
import Section from '../components/Section';
import H2 from '../components/H2';
import Card from '../components/Card';
import Image from 'next/image';


export default function Page() {
  return (
    <main className="text-gray-800">
      {/* Hero */}
      <section
        className="relative min-h-[80svh] md:min-h-[100svh] grid place-items-center text-center"
        aria-label="Hero Yoga Paris et ses alentours"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(/images/mountain_image.avif)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
            Cours de Yoga à Paris et ses alentours
          </h1>
          <p className="mt-6 text-white/90 text-lg">
            Pratique bienveillante, respiration, mouvement et détente — pour tous les niveaux.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="#planning" variant="primary" >
              Découvrir les cours
            </Button>
          </div>
          <div className="mt-8 flex justify-center">
            <a
              href="https://instagram.com/devi_yoga_paris"
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              aria-label="Suivre sur Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="instagram-gradient-hero" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f9ce34" />
                      <stop offset="25%" stopColor="#ee2a7b" />
                      <stop offset="50%" stopColor="#6228d7" />
                      <stop offset="100%" stopColor="#6228d7" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#instagram-gradient-hero)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="text-sm text-white/90 font-medium">@devi_paris_yoga</span>
            </a>
          </div>
        </div>
      </section>

      {/* Cours à Paris */}
      <Section id="cours-paris" bg="bg-emerald-50/40">
        <H2 kicker="Lieu">Cours de Yoga à Paris</H2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5 leading-relaxed">
            <p>
              Bonjour, je suis <strong>Antoine -Devi-</strong>, professeur certifié 200H TTC à Goa en Inde en Hatha Yoga (2024), également formé au Yoga Nidra et au Trauma Informed Yoga. Passioné par une transmission
              accessible et respectueuse du corps, je propose mes cours à Paris et ses alentours (collectifs et à domicile).
            </p>
            <p>
              J'adapte les postures et les enchaînements à chacun·e afin de favoriser une progression douce et
              durable. Mon intention : vous offrir un espace de sérénité et d'écoute.
            </p>
            <p>
              Chaque séance associe postures (asanas), respiration (pranayama) et relaxation guidée pour
              renforcer le corps et apaiser le mental.
            </p>
            <div className="p-5 rounded-xl border border-emerald-100 bg-emerald-50">
              <p className="text-sm text-emerald-900">
                ✨ Cours en petit groupe, niveau débutant.
              </p>
            </div>
          </div>
          <Card>
            <Image
              src="/images/tapis_yoga.avif"
              alt="cours de yoga Paris Devi professeur"
              className="w-full h-80 md:h-96 object-cover rounded-2xl"
              width={500}
              height={500}
            />
          </Card>
        </div>
      </Section>

      {/* Styles de Yoga proposés */}
      <Section id="styles" bg="bg-white">
        <H2 kicker="Pratiques">Styles de Yoga proposés</H2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[

            { title: 'Hatha', desc: 'Alignement, tenue des postures et conscience corporelle.' },
            { title: 'Yoga Nidra', desc: 'Détente profonde, relaxation et écoute du corps.' },
            { title: 'Pranayama', desc: 'Techniques de respiration pour l\'équilibre intérieur.' },

          ].map((s) => (
            <Card key={s.title} className="p-6">
              <h3 className="text-lg font-medium text-gray-900">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Témoignages
      <Section id="temoignages" bg="bg-white">
        <H2 kicker="Ils en parlent">Témoignages</H2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Camille',
              text:
                'Des cours très équilibrés : on travaille, on respire, on se détend. Devi est attentive et bienveillante.',
            },
            {
              name: 'Louis',
              text:
                'Parfait pour débuter ! Les explications sont claires et l\'ambiance apaisante. J\'ai gagné en mobilité.',
            },
            {
              name: 'Sofia',
              text:
                'J\'apprécie les ajustements personnalisés et la progression douce. Un vrai moment pour moi chaque semaine.',
            },
          ].map((t) => (
            <Card key={t.name} className="p-6">
              <p className="text-sm text-gray-700">“{t.text}”</p>
              <p className="mt-4 text-sm font-medium text-gray-900">{t.name}</p>
            </Card>
          ))}
        </div>
      </Section> */}

      {/* Tarifs & inscription */}
      <Section id="tarifs" bg="bg-emerald-50/40">
        <H2 kicker="Tarifs">Tarifs & inscription</H2>

        {/* Design mobile-friendly avec cartes */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Cours collectif',
              description: 'En studio / en plein air',
              duration: '1h',
              price: '15€',
              subtitle: '10€ en extérieur',
            },
            {
              title: 'Cours à domicile',
              description: 'À domicile, personnalisé',
              duration: '1h',
              price: '60€',

            },
            {
              title: 'Cours en ligne',
              description: 'En visio',
              duration: '1h',
              price: '10€',

            },
          ].map((tarif) => (
            <Card
              key={tarif.title}
              className={`p-6 relative`}
            >

              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tarif.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {tarif.description} • {tarif.duration}
                </p>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-emerald-600">
                    {tarif.price}
                  </span>
                  {tarif.subtitle && (
                    <p className="text-sm text-gray-500 mt-1">
                      {tarif.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

      </Section>
      {/* Planning */}
      <div id="planning"></div>
      <WeeklyPlanning />
      {/* FAQ */}
      {/* <Section id="faq" bg="bg-white">
        <H2 kicker="Questions fréquentes">FAQ</H2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: 'Quel est le tarif d\'un cours de yoga à Paris ?',
              a: 'Le cours collectif est à 20€. Des cartes et tarifs réduits peuvent être proposés selon la période.',
            },
            {
              q: 'Où ont lieu les cours de yoga à Vincennes ?',
              a: 'Quand la météo le permet, au bois de Vincennes pour des séances en plein air.',
            },
            {
              q: 'Proposez‑vous des cours particuliers ?',
              a: 'Oui, à domicile à Paris et ses alentours, avec un programme adapté à vos besoins.',
            },
            {
              q: 'Je suis débutant·e, puis‑je participer ?',
              a: 'Bien sûr ! Les cours sont ouverts à tous les niveaux, avec des options pour chaque posture.',
            },
          ].map((item) => (
            <Card key={item.q} className="p-6">
              <p className="font-medium text-gray-900">{item.q}</p>
              <p className="mt-2 text-sm text-gray-700">{item.a}</p>
            </Card>
          ))}
        </div>
      </Section> */}

      {/* Contact */}
      <Section id="contact" bg="bg-emerald-50/40">
        <H2 kicker="Réserver / Contact">Contact</H2>
        <Card className="p-6">
          <ContactForm />
          <div className="mt-6 flex items-center justify-center">
            <a
              href="https://instagram.com/devi_yoga_paris"
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              aria-label="Suivre sur Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="instagram-gradient-contact" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f9ce34" />
                    <stop offset="25%" stopColor="#ee2a7b" />
                    <stop offset="50%" stopColor="#6228d7" />
                    <stop offset="100%" stopColor="#6228d7" />
                  </linearGradient>
                </defs>
                <path fill="url(#instagram-gradient-contact)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-sm font-medium">@devi_yoga_paris</span>
            </a>
          </div>
        </Card>
      </Section>

      {/* Footer minimal */}
      <footer className="py-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Devi Yoga — Paris et ses alentours
      </footer>
    </main>
  );
}

