import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 md:py-24 px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center md:items-start">
        <div className="flex-1  lg:mt-20">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-primary">
              Empowering Africa's Future
            </h1>
            <p className="text-muted-foreground text-lg">
              ReadyToLeadAfrica is actively monitoring and influencing regions
              across the globe.
            </p>
          </div>
          {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 bg-muted rounded-md p-4">
              <LocateIcon className="w-6 h-6 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">Ghana</h3>
                <p className="text-sm text-muted-foreground">Accra</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted rounded-md p-4">
              <LocateIcon className="w-6 h-6 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">Kenya</h3>
                <p className="text-sm text-muted-foreground">Nairobi</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted rounded-md p-4">
              <LocateIcon className="w-6 h-6 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">RSA</h3>
                <p className="text-sm text-muted-foreground">Johannesburg</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted rounded-md p-4">
              <LocateIcon className="w-6 h-6 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">Liberia</h3>
                <p className="text-sm text-muted-foreground">Monrovia</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted rounded-md p-4">
              <LocateIcon className="w-6 h-6 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">Zimbabwe</h3>
                <p className="text-sm text-muted-foreground">Harare</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted rounded-md p-4">
              <LocateIcon className="w-6 h-6 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">USA</h3>
                <p className="text-sm text-muted-foreground">
                  Washington, D.C.
                </p>
              </div>
            </div>
          </div> */}

          <div className="flex flex-wrap gap-2 mt-5 ">
            <Badge variant="outline">Ghana</Badge>
            <Badge variant="outline">Kenya</Badge>
            <Badge variant="outline">RSA</Badge>
            <Badge variant="outline">Liberia</Badge>
            <Badge variant="outline">Zimbabwe</Badge>
            <Badge variant="outline">USA</Badge>
            <Badge variant="outline">Canada</Badge>
            <Badge variant="outline">Gambia</Badge>
            <Badge variant="outline">Algeria</Badge>
            <Badge variant="outline">Kenya</Badge>
            <Badge variant="outline">Sierra Leone</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-20">
            <Link
              href="/dashboard"
              className="group rounded-lg border px-5 py-4 transition-colors hover:border-[#0b213f] focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Project KIB
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Kogi, Imo, Bayelsa
              </p>
            </Link>

            <Link
              href="https://followtheresult-eo.vercel.app"
              rel="noopener"
              target="_blank"
              className="group rounded-lg border px-5 py-4 transition-colors hover:border-[#0b213f] focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Project EO
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Visit project
              </p>
            </Link>
          </div>
        </div>
        <div className="flex-1 relative h-[300px] w-[300px] md:h-[600px] md:w-auto rounded-lg overflow-hidden mx-auto">
          {/* <div className="absolute inset-0 bg-black/50 z-10" /> */}
          <img
            src="/africa.svg"
            alt="Africa Map"
            className="object-cover object-center"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-6 md:p-10">
            {/* <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Empowering Africa's Future
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl">
                Insights and impact from the ground.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
