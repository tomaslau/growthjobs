"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import config from "@/config/config";

export function Footer() {
  const [copyrightYears, setCopyrightYears] = useState(
    config.footer.copyright.startYear.toString()
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentYear = new Date().getFullYear();
      if (currentYear !== config.footer.copyright.startYear) {
        setCopyrightYears(
          `${config.footer.copyright.startYear}-${currentYear}`
        );
      }
    }
  }, []);

  return (
    <footer className="border-t mt-24">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 pb-8 border-b">
            {config.footer.brand.show && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-900">
                  {config.nav.title}
                </h3>
                <p className="text-sm text-zinc-600 max-w-[280px]">
                  {config.footer.brand.description}
                </p>
                <div className="flex items-center space-x-3 pt-2">
                  {config.nav.github.show && (
                    <Link
                      href={config.nav.github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 hover:text-zinc-900 transition-colors"
                      aria-label="View on GitHub"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                      >
                        <g clipPath="url(#clip0_2557_232)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 0C5.3724 0 0 5.3556 0 11.964C0 17.2488 3.438 21.732 8.2068 23.3136C8.8068 23.424 9.0252 23.0544 9.0252 22.7376C9.0252 22.4544 9.0156 21.7008 9.0096 20.7036C5.6712 21.426 4.9668 19.0992 4.9668 19.0992C4.422 17.718 3.6348 17.3496 3.6348 17.3496C2.5452 16.608 3.7176 16.6224 3.7176 16.6224C4.9212 16.7064 5.5548 17.8548 5.5548 17.8548C6.6252 19.6836 8.364 19.1556 9.0468 18.8484C9.1572 18.0768 9.4668 17.5488 9.81 17.25C7.146 16.9488 4.344 15.9216 4.344 11.3376C4.344 10.032 4.812 8.9628 5.5788 8.1276C5.4552 7.8252 5.0436 6.6084 5.6964 4.962C5.6964 4.962 6.7044 4.6404 8.9964 6.1884C9.97544 5.92201 10.9854 5.78604 12 5.784C13.02 5.7888 14.046 5.9208 15.0048 6.1872C17.2956 4.6392 18.3012 4.9608 18.3012 4.9608C18.9564 6.6072 18.5448 7.824 18.4212 8.1264C19.1892 8.9616 19.6548 10.0308 19.6548 11.3364C19.6548 15.9324 16.848 16.944 14.1756 17.2404C14.6064 17.6088 14.9892 18.3384 14.9892 19.4556C14.9892 21.054 14.9748 22.344 14.9748 22.7364C14.9748 23.0568 15.1908 23.4288 15.8004 23.3124C20.5644 21.7284 24 17.2476 24 11.964C24 5.3556 18.6264 0 12 0Z"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_2557_232">
                            <rect width="24" height="24" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </Link>
                  )}
                  {config.nav.linkedin.show && (
                    <Link
                      href={config.nav.linkedin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 hover:text-zinc-900 transition-colors"
                      aria-label="Follow us on LinkedIn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 1a4 4 0 0 0 -4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4 -4V5a4 4 0 0 0 -4 -4H5Zm1.205 6.91a1.705 1.705 0 1 0 0 -3.41 1.705 1.705 0 0 0 0 3.41ZM7.909 19.5V9.273H4.5V19.5h3.41Zm4.432 -10.227H9.273V19.5h3.068v-6.17c0.395 -0.642 1.077 -1.33 2.045 -1.33 1.364 0 1.705 1.364 1.705 2.046V19.5H19.5v-5.454c0 -1.828 -0.797 -4.773 -3.75 -4.773 -1.878 0 -2.92 0.685 -3.41 1.327V9.273Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  )}
                  {config.nav.twitter.show && (
                    <Link
                      href={config.nav.twitter.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 hover:text-zinc-900 transition-colors"
                      aria-label="Follow us on X (Twitter)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 1C2.79086 1 1 2.79086 1 5v14c0 2.2091 1.79086 4 4 4h14c2.2091 0 4 -1.7909 4 -4V5c0 -2.20914 -1.7909 -4 -4 -4H5Zm-0.33429 3.5c-0.17536 0.06527 -0.32332 0.19509 -0.40968 0.3683 -0.12689 0.2545 -0.09892 0.55889 0.07223 0.78601l5.61418 7.45029 -5.91591 6.344c-0.01551 0.0167 -0.03011 0.0338 -0.04382 0.0514h2.04691l4.82948 -5.179 3.7133 4.9278c0.0871 0.1155 0.2043 0.2018 0.3364 0.2512h4.4223c0.1748 -0.0654 0.3224 -0.195 0.4085 -0.3679 0.1269 -0.2545 0.099 -0.5589 -0.0722 -0.786l-5.6142 -7.4503L20.0173 4.5h-2.051l-4.8298 5.17932 -3.7133 -4.92774c-0.08729 -0.11583 -0.20496 -0.20227 -0.3375 -0.25158H4.66571ZM15.5454 18.0475 6.4315 5.95294h2.01878L17.5642 18.0475h-2.0188Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  )}
                  {config.nav.bluesky.show && (
                    <Link
                      href={config.nav.bluesky.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 hover:text-zinc-900 transition-colors"
                      aria-label="Follow us on Bluesky"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="h-4 w-4"
                        fill="currentColor"
                      >
                        <path d="M111.8 62.2C170.2 105.9 233 194.7 256 242.4c23-47.6 85.8-136.4 144.2-180.2c42.1-31.6 110.3-56 110.3 21.8c0 15.5-8.9 130.5-14.1 149.2C478.2 298 412 314.6 353.1 304.5c102.9 17.5 129.1 75.5 72.5 133.5c-107.4 110.2-154.3-27.6-166.3-62.9l0 0c-1.7-4.9-2.6-7.8-3.3-7.8s-1.6 3-3.3 7.8l0 0c-12 35.3-59 173.1-166.3 62.9c-56.5-58-30.4-116 72.5-133.5C100 314.6 33.8 298 15.7 233.1C10.4 214.4 1.5 99.4 1.5 83.9c0-77.8 68.2-53.4 110.3-21.8z"></path>
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {config.footer.resources.show && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-900">
                  {config.footer.resources.title}
                </h3>
                <ul className="space-y-2">
                  {config.footer.resources.links.map(({ link, label }) => (
                    <li key={link}>
                      <Link
                        href={link}
                        className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {config.footer.legal.show && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-900">
                  {config.footer.legal.title}
                </h3>
                <ul className="space-y-2">
                  {config.footer.legal.links.map(
                    ({ link, label, external }) => (
                      <li key={link}>
                        <Link
                          href={link}
                          className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {config.footer.postJob.show && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-900">
                  {config.footer.postJob.title}
                </h3>
                <p className="text-sm text-zinc-600 max-w-[280px]">
                  {config.footer.postJob.description}
                </p>
                <Button
                  asChild
                  size="xs"
                  className="bg-zinc-900 text-white hover:bg-zinc-800 gap-1.5 text-xs"
                >
                  <Link href={config.footer.postJob.button.link}>
                    <PlusCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {config.footer.postJob.button.label}
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {config.footer.copyright.show && (
              <div className="text-xs text-gray-500">
                {copyrightYears} © {config.footer.copyright.text}
              </div>
            )}
            {config.footer.builtBy.show && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {config.footer.builtBy.text}
                </span>
                <div className="flex items-center gap-1">
                  {config.footer.builtBy.showLogo && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 154 154"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0"
                    >
                      <rect width="154" height="154" rx="77" fill="#0A0A0A" />
                      <path
                        d="M77.8 106.2C71.9667 106.2 66.85 105.033 62.45 102.7C58.05 100.333 54.6333 97.05 52.2 92.85C49.8 88.65 48.6 83.8 48.6 78.3C48.6 72.7333 49.8 67.9167 52.2 63.85C54.6333 59.75 58.05 56.5667 62.45 54.3C66.85 52.0333 71.9667 50.9 77.8 50.9C82.1667 50.9 86.0333 51.55 89.4 52.85C92.7667 54.1167 95.5833 55.8 97.85 57.9C100.117 60 101.833 62.3 103 64.8C104.167 67.3 104.75 69.7833 104.75 72.25C104.75 72.2833 104.75 72.35 104.75 72.45C104.75 72.5167 104.75 72.5833 104.75 72.65H89.4C89.4 72.45 89.3833 72.2667 89.35 72.1C89.35 71.9 89.3167 71.7 89.25 71.5C88.9833 70.1 88.4 68.7833 87.5 67.55C86.6 66.3167 85.3333 65.3167 83.7 64.55C82.1 63.75 80.1 63.35 77.7 63.35C75.1333 63.35 72.8333 63.9167 70.8 65.05C68.8 66.1833 67.2167 67.8667 66.05 70.1C64.8833 72.3 64.3 75.0333 64.3 78.3C64.3 81.5 64.8833 84.2667 66.05 86.6C67.2167 88.9 68.8 90.6667 70.8 91.9C72.8333 93.1333 75.1333 93.75 77.7 93.75C80.3333 93.75 82.4833 93.35 84.15 92.55C85.8167 91.7167 87.0667 90.6167 87.9 89.25C88.7333 87.85 89.2333 86.3167 89.4 84.65H104.75C104.75 87.1167 104.167 89.6333 103 92.2C101.867 94.7333 100.167 97.05 97.9 99.15C95.6667 101.25 92.8667 102.95 89.5 104.25C86.1333 105.55 82.2333 106.2 77.8 106.2Z"
                        fill="white"
                      />
                    </svg>
                  )}
                  <Link
                    href={config.footer.builtBy.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-gray-900 hover:text-gray-700"
                  >
                    {config.footer.builtBy.name}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
