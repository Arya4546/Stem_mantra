export interface Testimonial {
  id: string;
  name: string;
  role: string;
  school: string;
  image: string;
  content: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Neha Sethi",
    role: "ATL Incharge",
    school: "ST. THOMAS GIRLS SR SEC SCHOOL NEW DELHI, DELHI",
    image: "/images/testimonials/neha.jpeg",
    content:
      "The STEMmantra team has been a great support for our students. Their trainers are knowledgeable and supportive. They followed deductive methodology to explain the complex concepts in simple and step-wise manner. They did not only provide knowledge but also helped the students till the last step of project making. We are extremely satisfied with their services and look forward to a long association.",
  },
  {
    id: "2",
    name: "Sarvjeet Singh",
    role: "Director",
    school: "SHAHEED AMAR SINGH PUBLIC SCHOOL - GURUGRAM",
    image: "/images/testimonials/sarvjeet.png",
    content:
      "I am happy and satisfied with the exceptional products and service provided by Stemmantra. Their equipment and kits are reliable and competitively priced. Saurabh and the team are reliable in timely delivery and responsiveness in case of problems encountered by our students. Stemmantra is a valuable partner for any school seeking top-tier supplier for their ATLs.",
  },
  {
    id: "3",
    name: "Rajesh Srivastava",
    role: "Principal",
    school: "UNIQUE SCIENCE ACADEMY BASTI",
    image: "/images/testimonials/rajesh.jpg",
    content:
      "ATL,Robotics,AI=STEMMANTRA. STEMmantra has highly qualified team, we have got excellent service from the Company. I am impressed with their teaching methodology to students & Teachers. I highly recommend STEMMANTRA to schools who are looking for STEM Education, Robotics, AI to their schools.",
  },
  {
    id: "4",
    name: "Mahua Das Gupta",
    role: "Principal",
    school: "THE TRIBHUVAN SCHOOL PATNA",
    image: "/images/testimonials/mahua.jpg",
    content:
      "STEMMANTRA Technologies has been an invaluable partner in our quest for innovation and excellence. Their cutting-edge solutions and unwavering commitment to quality have consistently exceeded our expectations. Their expertise has catalyzed our growth and we look forward to a continued, successful partnership in the future.",
  },
  {
    id: "5",
    name: "Mrs. Vandana Mahajan",
    role: "Director Principal",
    school: "MOUNT OLYMPUS SCHOOL, SEC-47, GURUGRAM",
    image: "/images/testimonials/vandana.jpeg",
    content:
      "STEMmantra brings innovation to the classroom in the most engaging and practical ways. Their hands-on approach to STEM learning is truly empowering for both students and educators. A great partner in future-ready education! STEMmantra is doing exceptional work in bridging the gap between theoretical knowledge and real-world application.",
  },
];
