export default function AboutPage() {
  return (
    <main className="py-16 px-6 md:px-12 lg:px-24">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Welcome to our store! We are passionate about providing the best
          footwear experience for our customers. Our mission is to offer high
          quality shoes from trusted global brands — ensuring comfort, style,
          and performance for everyone.
        </p>
      </section>

      <section className="max-w-4xl mx-auto mt-12 space-y-6">
        <h2 className="text-2xl font-semibold">Our Story</h2>
        <p className="text-muted-foreground leading-relaxed">
          Our journey started with a simple idea: making high-quality sneakers
          accessible to everyone. Over the years, we have built strong
          relationships with top global brands, allowing us to curate a unique
          selection of footwear for men, women, and youth.
        </p>

        <h2 className="text-2xl font-semibold mt-10">What We Stand For</h2>
        <ul className="list-disc ml-6 text-muted-foreground space-y-3">
          <li>Premium quality products</li>
          <li>Fast and reliable customer service</li>
          <li>Curated collections for every style and activity</li>
          <li>Safe and simple shopping experience</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10">Our Vision</h2>
        <p className="text-muted-foreground leading-relaxed">
          We aim to become one of the leading online destinations for sneaker
          lovers worldwide, constantly expanding our selection and improving the
          customer experience.
        </p>
      </section>
    </main>
  );
}
