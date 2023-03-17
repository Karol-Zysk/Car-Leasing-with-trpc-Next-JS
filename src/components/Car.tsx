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
    <div className="flex  flex-col w-full  gap-2 items-center justify-between">
      <div className="card w-96 glass glass:hover shadow-md ">
        <figure className="w-full mt-2 flex justify-center items-center content-center  relative ">
          {photos && (
            <Image
              width={400}
              height={300}
              className="w-2/3 h-auto"
              src={`/images/${photos}.png`}
              alt="car photo"
            />
          )}
        </figure>
        <div className="card-body">
          <div className="w-full   flex justify-between">
            <div>
              <p>Make: {car.make}</p>
              <p>Model: {car.model}</p>
            </div>
            <div className="flex">
              {" "}
              <p>{car.year}</p>
            </div>
          </div>
          {/* <h2 className="card-title">Life hack</h2>
          <p>How to park your car at your garage?</p> */}
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Learn now!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
