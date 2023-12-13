import React from "react";
import Image from "next/image";
interface Props {
  imgSrc: string;
  title: string;
  alt: string;
  children: React.ReactNode;
}

const TutorialStep: React.FC<Props> = ({ imgSrc, alt, title, children }) => {
  return (
    <>
      <div className="flex flex-col w-1/3 p-10">
        <div className="flex flex-col ml-10   h-36">
          <h2>{title}</h2>
          <p>{children}</p>
        </div>
        <div className="border-solid border-1 border-stone-200 p-5 rounded-md shadow-md h-60">
          <Image src={imgSrc} alt={alt} width={250} height={250} />
        </div>
      </div>
    </>
  );
};

export default TutorialStep;
