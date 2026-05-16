import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import StatsBar from '../components/home/StatsBar';
import ServicesPreview from '../components/home/ServicesPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import TechMarquee from '../components/home/TechMarquee';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>NexaForge Solutions — Enterprise Software Development</title>
        <meta name="description" content="NexaForge builds scalable enterprise software — web apps, mobile, cloud, AI/ML. 120+ projects delivered for 80+ clients worldwide." />
        <meta property="og:title" content="NexaForge Solutions — Enterprise Software Development" />
        <meta property="og:description" content="We build, scale, and transform enterprise software products." />
        <meta property="og:url" content="https://nexaforge.io" />
        <link rel="canonical" href="https://nexaforge.io" />
      </Helmet>
      <Hero />
      <StatsBar />
      <ServicesPreview />
      <FeaturedProjects />
      <TechMarquee />
      <Testimonials />
      <CTASection />
    </>
  );
}
