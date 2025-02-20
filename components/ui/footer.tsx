"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import config from "@/config";

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
                  {config.nav.reddit.show && (
                    <Link
                      href={config.nav.reddit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 hover:text-zinc-900 transition-colors"
                      aria-label="Follow us on Reddit"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM18.9782 10.1972C20.1014 10.0845 21 10.9859 21 12.1127C21 12.9014 20.5507 13.5775 19.8768 13.9155V14.4789C19.8768 17.5211 16.3947 20 12.014 20C7.63339 20 4.15133 17.5211 4.15133 14.4789V13.9155C3.92668 13.9155 3.70203 13.6901 3.5897 13.5775C2.80343 12.7887 2.80343 11.5493 3.5897 10.7606C4.37598 9.97183 5.61154 9.97183 6.39782 10.7606C7.97036 9.6338 9.76755 9.07042 11.6771 9.07042L12.8003 4.22535C12.8003 4.11268 12.8003 4 12.9126 4H13.1373L16.2824 4.78873C16.507 4.33803 16.9563 4 17.5179 4C18.3042 4 18.9782 4.56338 18.9782 5.35211C18.9782 6.14084 18.4165 6.8169 17.6303 6.8169C16.844 6.8169 16.17 6.25352 16.17 5.46479L13.2496 4.78873L12.351 9.07042C14.2605 9.07042 16.0577 9.74648 17.6303 10.7606C17.9672 10.4225 18.5289 10.1972 18.9782 10.1972ZM8.86895 12.2254C8.19501 12.2254 7.52106 12.7887 7.52106 13.5775C7.52106 14.3662 8.08268 14.9296 8.86895 14.9296C9.5429 14.9296 10.2168 14.2535 10.2168 13.5775C10.2168 12.9014 9.65523 12.2254 8.86895 12.2254ZM12.014 18.3099C13.2496 18.4225 14.3729 17.9718 15.3838 17.2958C15.4961 17.0704 15.4961 16.8451 15.2715 16.7324C15.0468 16.6197 14.8222 16.6197 14.7098 16.7324C13.9236 17.2958 12.9126 17.6338 11.9017 17.5211C10.8908 17.6338 9.87988 17.2958 9.0936 16.7324C8.98128 16.6197 8.75663 16.6197 8.64431 16.7324C8.53198 16.9577 8.53198 17.1831 8.64431 17.2958C9.65523 17.9718 10.7785 18.3099 12.014 18.3099ZM13.6989 13.5775C13.6989 14.2535 14.2605 14.9296 15.0468 14.9296C15.8331 14.9296 16.507 14.3662 16.3947 13.5775C16.3947 12.9014 15.8331 12.2254 15.0468 12.2254C14.3729 12.2254 13.6989 12.9014 13.6989 13.5775Z"
                          fill="currentColor"
                        />
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
                  <Link
                    href={config.footer.postJob.button.link}
                    {...(config.footer.postJob.button.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <PlusCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {config.footer.postJob.button.label}
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {config.footer.copyright.show && (
              <div className="text-xs text-gray-500">
                {copyrightYears} © {config.footer.copyright.text}
              </div>
            )}
            {config.footer.builtWith.show && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {config.footer.builtWith.text}
                </span>
                <div className="flex items-center gap-1">
                  {config.footer.builtWith.showLogo && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.936 0.8H15.008V9.92H7.936V0.8Z" fill="white"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.502092 4.06933C0.180594 4.39076 0 4.82686 0 5.28153V14.2857C0 15.2324 0.767508 16 1.71429 16H10.7185C11.1731 16 11.6092 15.8193 11.9307 15.4979L15.4979 11.9307C15.8194 11.6092 16 11.1731 16 10.7185V1.71429C16 0.767579 15.2325 0 14.2857 0H5.28149C4.82686 0 4.39079 0.180665 4.06933 0.502092L0.502092 4.06933ZM8 9.00809C8 9.21429 8.16713 9.38142 8.37333 9.38142H12.1958C13.0443 9.38142 13.7 9.16951 14.1629 8.74581C14.6257 8.32213 14.8571 7.78473 14.8571 7.13351C14.8571 6.63909 14.7067 6.20759 14.4059 5.83886C14.105 5.46219 13.7232 5.22684 13.2603 5.13268C13.6537 5.02288 13.9855 4.81488 14.2554 4.50892C14.5331 4.19504 14.672 3.77916 14.672 3.2613C14.672 2.64146 14.4483 2.13547 14.0009 1.74316C13.5612 1.34291 12.9209 1.14286 12.0801 1.14286H8.37333C8.16713 1.14286 8 1.30999 8 1.51618V9.00809Z" fill="black"/>
                    </svg>
                  )}
                  <Link
                    href={config.footer.builtWith.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-gray-900 hover:text-gray-700"
                  >
                    {config.footer.builtWith.name}
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
