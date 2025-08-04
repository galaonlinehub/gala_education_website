import Image from "next/image";

import Animator from "../home/animations/Animator";

export const Authorities = () => {
  const images = [
    { src: "tcu.jpeg", alt: "TCU image" },
    { src: "necta.jpeg", alt: "NECTA image" },
    { src: "nactivet.jpeg", alt: "NACTIVET image" },
    { src: "nida.1", alt: "NIDA image" },
    { src: "cambridge.jpeg", alt: "CAMBRIDGE image" },
    { src: "ib-logo.png", alt: "IB image" },
  ];
  return (
    <div className="w-full flex flex-col items-center justify-center mb-24 px-3">
      <Animator delay={0.4} direction="top">
        <span className="font-black flex text-3xl text-center">
          Our Teacher Verification Process
        </span>
      </Animator>
      <Animator delay={0.6} direction="top">
        <div className="text-center text-xs px-2 lg:px-32 py-3 leading-6">
          Given the nature of our platform and the vulnerability of the student
          community we serve, Gala Education is deeply committed to ensuring that
          every teacher is thoroughly vetted to guarantee the safety and
          well-being of our learners. As part of this process, we require all
          teachers to submit their NIDA number and certified copies of their
          academic certificates, which will be forwarded to the relevant
          government authorities for verification. These bodies include, but are
          not limited to, the following:
        </div>
      </Animator>
      <Animator delay={0.8} direction="top">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 lg:gap-x-24 gap-y-6">
          {images.map(({ src, alt }, i) => (
            <Image
              key={i}
              src={`/authorities/${src}`}
              alt={alt}
              width={150}
              height={150}
            />
          ))}
        </div>
      </Animator>
    </div>
  );
};
