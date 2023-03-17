import { api } from "../utils/api";
import { Car } from "./Car";

export default function Todos() {
  const { data: cars, isLoading, isError } = api.car.getAllCars.useQuery();

  if (isLoading) return <div>Loading cars 🔄</div>;
  if (isError) return <div>Error fetching cars ❌</div>;

  return (
    <>
      {cars.length
        ? cars.map((car) => {
            return <Car key={car.id} car={car} />;
          })
        : "No cars yet..."}
    </>
  );
}
