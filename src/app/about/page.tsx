import Founders from "@/components/about/founders";
import OurStory from "@/components/about/our-story";
import Statistics from "@/components/about/statistics";
import Values from "@/components/about/values";



function About() {
  return (
    <main className="container">
      <OurStory />
      <Statistics/>
      {/* <Founders /> */}
      <Values />
    </main>
  );
}

export default About;