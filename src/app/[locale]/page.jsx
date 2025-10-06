'use client';
import Footer from '@/components/layout/Footer';
import { Faqs } from './_home/components/Faqs';
import { FeaturePress } from './_home/components/FeaturePress';
import { GiftOfLearning } from './_home/components/GiftOfLearning';
import { HomeBanner } from './_home/components/HomeBanner';
import { Trustees } from './_home/components/Trustees';
import { WhyChooseUs } from './_home/components/WhyChooseUs';

const Home = () => {
  return (
    <main className="h-screen w-screen overflow-x-hidden overflow-y-auto fixed">
      <HomeBanner />
      <FeaturePress />
      <Trustees />
      <WhyChooseUs />
      <GiftOfLearning />
      <Faqs />
      <Footer />
    </main>
  );
};

export default Home;
