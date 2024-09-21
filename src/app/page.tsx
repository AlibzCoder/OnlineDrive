import Image from "next/image";
import "@/src/styles/main-page.scss";
import Header from "@/src/components/MainPage/Header";
import Explorer from "@/src/components/MainPage/Explorer";

export default function Home() {
  

  return (
    <div className="page">
      <Header />
      <main className="main">
        <Explorer />
      </main>
    </div>
  );
}
