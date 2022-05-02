import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";

function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@thorwebdev" />
        <meta
          name="twitter:title"
          content="TypeScript Next.js Stripe Example"
        />
        <meta
          name="twitter:description"
          content="Full-stack TypeScript example using Next.js, react-stripe-js, and stripe-node."
        />
        <meta
          name="twitter:image"
          content="https://nextjs-typescript-react-stripe-js.vercel.app/social_card.png"
        />
      </Head>
      <div className="container">
        <header>
          <div className="header-content">
            <Link href="/">
              <a className="logo">
                <img src="/logo.png" />
              </a>
            </Link>
            <h1>
              <span className="light">Stripe Sample</span>
              <br />
              Next.js, JavaScript, and Stripe 🔒💸
            </h1>
          </div>
        </header>
        {children}
      </div>
      <div className="banner">
        <span>
          This is a{" "}
          <a
            href="https://github.com/stripe-samples"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe Sample, refactored by Justin Brenner
          </a>
          .{" View code on "}
          <a
            href="https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub{" "}
          </a>
        </span>
        <img
          src="/githubicon.png"
          alt="github"
          width={18}
          style={{ marginLeft: "5px" }}
        />
      </div>
    </>
  );
}

export default Layout;
