import { FaqCard } from "@/components/home/card/FaqCard";

export const Faqs = () => {
  const faqs = [
    {
      question: "What is Gala Education?",
      answer:
        "Gala Education is an online platform dedicated to providing high-quality tutoring for Primary, Secondary, and High School students across Tanzania. In addition to tutoring, we offer short courses designed to equip Tanzanian youth with self-employable skills. Our platform is powered by AI, which helps deliver personalized learning experiences tailored to each student's individual needs and progress. We also reinvest profits into philanthropic activities, including building classrooms and libraries for under-served communities.",
    },
    {
      question: "Is there a money-back guarantee?",
      answer:
        "Gala Education does not offer refunds unless there is a verified technical issue that prevents you from accessing our services. If you encounter such a problem, please contact our support team, and we will assist you in resolving the issue or processing a refund if necessary.",
    },
    {
      question: "Who can use Gala Education?",
      answer:
        "Gala Education is designed for students in Primary, Secondary, and High School across Tanzania who are looking for personalized tutoring in various subjects. Our short courses are open to young adults looking to acquire practical, self-employable skills in various fields. Anyone with access to a device and internet connection can benefit from our educational resources.",
    },

    {
      question: "Do I need a device to access the tutoring sessions?",
      answer:
        "Yes, you will need a device, such as a smartphone, tablet, or computer, and a stable internet connection to access our online tutoring sessions. This allows you to participate in lessons, access learning materials, and interact with our qualified tutors from anywhere at your convenience.",
    },
    {
      question: "Do I need to be a registered user to donate?",
      answer:
        "No, donations can be made by anyone, regardless of whether you are a registered user of Gala Education. Our donation system is designed to allow anyone who wants to support our mission to contribute. The funds are directly used to support children's education, particularly those from low-income backgrounds who lack access to quality resources.",
    },
    {
      question: "How are the donations used?",
      answer:
        "All donations received are reinvested into our philanthropic efforts to improve education in Tanzania. This includes building and equipping classrooms, libraries, and providing educational materials for under-served communities. The donations also help support the development of educational programs that benefit students in need, ensuring that every child has access to quality learning opportunities.",
    },
    {
      question:
        "What makes Gala Education different from other tutoring platforms?",
      answer:
        "Gala Education stands out by combining quality online tutoring with a strong commitment to community development. Not only do we provide expert tutors to support student learning, but we also employ teachers across Tanzania to help address the national shortage of qualified educators. Our platform also integrates AI-powered personalized learning to enhance each student's progress. Moreover, we reinvest profits into community-building projects like classrooms and libraries, making our mission far-reaching and impactful.",
    },

    {
      question: "How do the short courses work?",
      answer:
        "Our short courses are specifically designed to equip Tanzanian youth with practical, self-employable skills in various industries such as technology, business, and creative fields. These courses are taught by experienced academics, executives, and industry leaders. Students can take the courses online, at their own pace, and gain valuable skills that will help them pursue self-employment or career opportunities. Upon completion, students may also receive certification for the skills they've learned.",
    },

    {
      question: "Is there any age limit for the short courses?",
      answer:
        "There is no specific age limit for the short courses. The courses are open to all Tanzanian youth who are eager to learn and acquire skills for self-employment. Whether you're a recent graduate, a young professional, or someone looking to switch careers, our short courses offer flexible learning opportunities that can be adapted to your personal goals.",
    },

    {
      question: "How can I become a tutor on Gala Education?",
      answer:
        "If you are a qualified educator with a passion for teaching and helping students succeed, you can apply to become a tutor at Gala Education. We are always looking for skilled tutors who can deliver personalized, high-quality lessons across a range of subjects. To apply, visit our website to submit your application, and we will contact you if there is a suitable opportunity to join our team.",
    },

    {
      question: "Can I access Gala Education if I live outside of Tanzania?",
      answer:
        "While Gala Education is primarily focused on providing services to students within Tanzania, anyone with a stable internet connection can access our short courses. Our online platform allows individuals from anywhere in the world to benefit from our industry-leading courses that equip youth with valuable skills for self-employment. However, tutoring sessions are designed specifically for Tanzanian students, so availability may vary depending on your location.",
    },
  ];
  return (
    <section className="w-full md:w-2/3 mb-20 mx-auto px-3">
      <h2 className="text-xl font-black">Frequently Asked Questions (FAQ)</h2>
      <div>
        {faqs.map(({ question, answer }, idx) => (
          <FaqCard key={idx} faqQn={question} faqAns={answer} />
        ))}
      </div>
    </section>
  );
};
