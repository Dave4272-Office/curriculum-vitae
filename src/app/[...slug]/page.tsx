import { permanentRedirect } from "next/navigation";
import { spaFallbackHref } from "../../lib/spa-fallback";

export default function UnknownPathPage() {
  permanentRedirect(spaFallbackHref);
}
