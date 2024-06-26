import {
  Img1,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6,
  Img7,
  Img8,
} from "./assets";

function App() {
  const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];
  return (
    <div className="h-screen">
      <main className="h-full  bg-red-100">
        <div className="w-3/4 m-auto h-full flex flex-col justify-evenly">
          <h1 className="text-7xl text-center">Pronation</h1>
          <div className="grid grid-cols-4 gap-4 ">
            {images.map((url, i) => {
              return (
                <div key={i} className="relative h-60 w-full">
                  <img className="w-full h-full" src={url} />
                </div>
              );
            })}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/bot";
            }}
            className="self-center w-fit px-4 py-2 bg-blue-300 text-slate-700 rounded"
          >
            Start
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
