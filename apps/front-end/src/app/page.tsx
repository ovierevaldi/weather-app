import Header from "./components/common/Header";
import WeatherCard from "./components/WeatherCard";
export default function Home() {
  return (
    <div>
        <Header />
          <main>
            <div className="flex">
              <WeatherCard/>
            </div>
          </main>
    </div>
  );
}
