import { useNavigate } from "react-router-dom";
import { Button } from "@/atoms";
import { ArrowLeft } from "lucide-react";
import Layout from "@/layout";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-120px)]">
        {/* Number */}
        <div className="relative select-none mb-6">
          <span className="text-[160px] font-extrabold leading-none text-primary/10 tracking-tighter">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-[72px] font-extrabold text-primary/20 tracking-tighter">
            404
          </span>
        </div>

        {/* Icon */}
        <div className="mb-6 flex items-center justify-center size-20 rounded-full bg-primary/10 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
            <path d="M11 8v4" />
            <path d="M11 16h.01" />
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Page not found
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm mb-8">
          The page you're looking for doesn't exist or has been moved. Check the
          URL or head back to a safe place.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft size={15} />
            Go back
          </Button>
          <Button onClick={() => navigate("/", { replace: true })}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </Layout>
  );
}
