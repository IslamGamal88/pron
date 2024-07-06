import { Link } from "@tanstack/react-router";
import {
  Img1,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6,
  Img7,
  Img8,
  Pron,
} from "./assets";

function App() {
  const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];
  return (
    <div className="sm:h-[calc(100vh-41px)]">
      <main className="overflow-hidden">
        <div className="container mx-auto h-full flex flex-col justify-between p-4 sm:p-0">
          <h1 className="text-7xl text-center sm:mb-4 font-raleway">
            Pronation
          </h1>
          <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-1 sm:h-[40vh] md:h-auto">
            <div className="relative h-full w-ful">
              <img
                className="w-full h-full object-cover"
                src={Pron}
                alt="Pronation"
              />
            </div>
            <div className="flex flex-col gap-4 justify-center sm:px-4 sm:bg-slate-200">
              <h2 className="text-4xl">Posture analysis</h2>
              <div>
                <h3 className="text-2xl">About pronation</h3>
                <p>
                  Overpronation happens when your gait (the way you
                  walk or run) eventually causes the arches of your
                  feet to flatten more than they would normally.
                  Overpronation increases the risk you’ll injure your
                  foot and leg. But you can correct the problem with
                  therapeutic exercise
                </p>
              </div>
            </div>
          </div>
          <div className="my-6">
            <h2 className="text-4xl text-center mt-2 font-raleway">
              Exactly what you need
            </h2>
            <article className="text-4xl text-center font-raleway">
              The secret for therapeutic exercise
            </article>
          </div>
          <div className="mt-4 flex flex-col sm:grid sm:grid-cols-4 sm:gap-4 w-full sm:w-3/4 self-center">
            {images.map((url, i) => {
              return (
                <div key={i} className="relative h-60 w-full">
                  <img
                    className="w-full h-full object-cover"
                    src={url}
                    alt={`Image ${i + 1}`}
                  />
                </div>
              );
            })}
          </div>
          <Link
            to="/bot"
            className="self-center mt-8 w-full text-center sm:w-fit px-8 py-2 bg-blue-300 text-slate-700 rounded"
          >
            Start
          </Link>
        </div>
      </main>
    </div>
  );
}

export default App;
