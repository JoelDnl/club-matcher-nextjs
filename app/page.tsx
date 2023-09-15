"use client";

import Button from "@/components/ui/Button";
import Header from "@/components/Header";
import Card from "@/components/ui/Card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { SyntheticEvent } from "react";

export default function Home() {
  const { push } = useRouter();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    push("/quiz");
    return;
  };

  return (
    <main>
      <Navbar />
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto justify-center gap-8 px-6 mt-4">
        <Card className="">
          <h2 className="text-xl md:text-2xl font-semibold">
            Why Join a Club?
          </h2>
          <p>
            Joining a club opens up many opportunities and allows for a balance
            between academic life and extra-curricular activities.
          </p>
          <p>
            With close to 200 clubs to choose from, there is something for
            everyone!
          </p>
          <a
            href="https://westernu.campuslabs.ca/engage/organizations"
            target="_blank"
            className="underline text-western inline-flex"
          >
            See All Clubs
          </a>
        </Card>
        <Card className="">
          <h2 className="text-xl md:text-2xl font-semibold">
            What is Clubs Week?
          </h2>
          <p>
            Clubs Week usually takes place in September each year. It showcases
            all of the clubs and provides students with a chance to learn more
            about the opportunities available with each club.
          </p>
        </Card>
        <Card className="">
          <h2 className="text-xl md:text-2xl font-semibold">
            How long is the quiz and how does it work?
          </h2>
          <p>The quiz is a total of 8 questions.</p>
          <p>
            We ask a representative from each club to take the exact same quiz.
            We find the three clubs with the highest similarity to your set of
            answers.
          </p>
          <br />
        </Card>
        <Card className="">
          <h2 className="text-xl md:text-2xl font-semibold">
            Find Your New Club:
          </h2>
          <form className="" onSubmit={handleSubmit}>
            <Button className="w-32" type="submit">
              Start Quiz
            </Button>
          </form>
        </Card>
      </div>
      <Footer />
    </main>
  );
}
