import LorenzAttractor from "@/components/lorenz";
import TextType from "@/ReactBits/TextType/TextType";

export default function Home() {
  return (
    <main className="p-4 h-screen w-screen">
      <div className="fixed w-full h-full -z-10">
        <LorenzAttractor />
      </div>
      <TextType
        className="text-6xl"
        text={["Welcome to Justin's blog!", "Think twice, code once."]}
      />
    </main>
  );
}
