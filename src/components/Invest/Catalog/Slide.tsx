import Image from "next/image";
import { useRouter } from "next/router";

const InvestSlide = ({ images, id }: { images: any; id: string }) => {
  const router = useRouter();

  return (
    <div className="investSlide" onClick={() => router.push(`/catalog/${id}`)}>
      <div className="investSlide__image investSlide__image--desk">
        <Image
          className=""
          src={`${
            images[1].meta.assets == "" ? `` : `https://admin.bissbox.com`
          }${images[1].path}`}
          layout="fill"
          objectFit="contain"
          alt="card-image"
        />
      </div>{" "}
      <div className="investSlide__image investSlide__image--mob">
        <Image
          className=""
          src={`${
            images[0].meta.assets == "" ? `` : `https://admin.bissbox.com`
          }${images[0].path}`}
          layout="fill"
          objectFit="contain"
          alt="card-image"
        />
      </div>
    </div>
  );
};

export default InvestSlide;
