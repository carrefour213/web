import { ImageProps } from "@/lib/edgestore";



function ImageCard({ image }: { image: ImageProps }) {
    return (
        <div key={image.url} className="border-0 p-0 w-full h-full relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md aspect-square">
            <img
                className="h-full w-full rounded-md object-cover"
                src={image.url}
                alt="product img"
            />
        </div>
    );
}

export default ImageCard;