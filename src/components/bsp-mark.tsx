import Image from "next/image";
import { type Locale, pick } from "@/content/site";

export const BSP_ELEPHANT_URL =
  "https://upload.wikimedia.org/wikipedia/commons/9/98/Indian_Election_Symbol_Elephant.png";

export function BspMark({
  locale,
  className = "h-auto w-24",
  decorative = false,
}: {
  locale: Locale;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <Image
      src={BSP_ELEPHANT_URL}
      alt={
        decorative
          ? ""
          : pick(
              locale,
              "बहुजन समाज पार्टी का चुनाव चिह्न हाथी",
              "Bahujan Samaj Party election symbol, elephant",
            )
      }
      width={413}
      height={369}
      unoptimized
      className={className}
    />
  );
}
