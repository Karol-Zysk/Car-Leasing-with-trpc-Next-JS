import Image from "next/image";
import type { Car } from "../types";
import { api } from "../utils/api";
import car1 from "../assets/images/car1.png";

type CarProps = {
  car: Car;
};

export function Car({ car }: CarProps) {
  const { photos } = car;
  console.log(photos);

  return (
    <div className="flex  flex-col w-full gap-2 items-center justify-between">
      <div className="flex flex-col w-full gap-2 items-center">
        <div className="flex justify-between  w-full ">
          <div className="w-full  flex justify-between">
            <div>
              <p>Make: {car.make}</p>
              <p>Model: {car.model}</p>
            </div>
            <div className="flex">
              {" "}
              <p>{car.year}</p>
            </div>
          </div>
        </div>
        {photos && (
          <Image
            width={100}
            height={100}
            src={`/images/${photos}.png`}
            alt="car photo"
          />
        )}
        <p className="mt-2">price: 270.000zł</p>
      </div>
    </div>
  );
}
