import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:py-8">
        <div className="flex items-center gap-2">
          <Image
            src="/readytoleadafrica.jpeg"
            alt="readytoleadafrica logo"
            width={150}
            height={40}
          />
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="https://readytoleadafrica.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="https://readytoleadafrica.org/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            prefetch={false}
          >
            Projects
          </Link>
          <Link
            href="https://readytoleadafrica.org/about-us"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            prefetch={false}
          >
            Impact
          </Link>
          <Link
            href="https://readytoleadafrica.org/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground">
          &copy; 2024 FollowTheResult. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
