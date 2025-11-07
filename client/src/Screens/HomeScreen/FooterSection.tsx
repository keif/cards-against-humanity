import React from 'react';

const FooterSection: React.FC = () => {
    return (
        <footer className="py-12 px-6 md:py-12 md:px-6 bg-brand-gray-dark text-white">
            <div className="max-w-content-lg mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-6 md:gap-8 mb-8 md:mb-10">
                    <div className="flex flex-col">
                        <h3 className="text-base md:text-lg font-semibold mb-3 text-white">
                            🎴 Free Online Cards Against Humanity
                        </h3>
                        <p className="text-sm leading-relaxed text-footer-text m-0">
                            A fan-made tribute to the party game we love.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <h4 className="text-base font-semibold mb-3 text-white">Play</h4>
                        <ul className="list-none p-0 m-0 space-y-2">
                            <li>
                                <a
                                    href="#how-it-works"
                                    className="text-sm text-footer-text no-underline transition-colors hover:text-white hover:underline"
                                >
                                    How to Play
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#rules"
                                    className="text-sm text-footer-text no-underline transition-colors hover:text-white hover:underline"
                                >
                                    Game Rules
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#submit"
                                    className="text-sm text-footer-text no-underline transition-colors hover:text-white hover:underline"
                                >
                                    Submit Cards
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h4 className="text-base font-semibold mb-3 text-white">Community</h4>
                        <ul className="list-none p-0 m-0 space-y-2">
                            <li>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-footer-text no-underline transition-colors hover:text-white hover:underline"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#report"
                                    className="text-sm text-footer-text no-underline transition-colors hover:text-white hover:underline"
                                >
                                    Report Bugs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#moderation"
                                    className="text-sm text-footer-text no-underline transition-colors hover:text-white hover:underline"
                                >
                                    Moderation Guidelines
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h4 className="text-base font-semibold mb-3 text-white">Legal</h4>
                        <ul className="list-none p-0 m-0 space-y-2">
                            <li>
                                <a
                                    href="#privacy"
                                    className="text-sm text-footer-text no-underline transition-colors hover:text-white hover:underline"
                                >
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#content"
                                    className="text-sm text-footer-text no-underline transition-colors hover:text-white hover:underline"
                                >
                                    Content Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#license"
                                    className="text-sm text-footer-text no-underline transition-colors hover:text-white hover:underline"
                                >
                                    Open Source License
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-brand-gray pt-6 text-center">
                    <p className="text-xs md:text-xs leading-relaxed text-footer-text-muted m-0 mb-3 md:text-left">
                        <strong>Disclaimer:</strong> Not affiliated with, endorsed by, or sponsored by Cards Against Humanity LLC.
                    </p>
                    <p className="text-xs md:text-xs leading-relaxed text-footer-text-muted m-0 md:text-left">
                        Cards Against Humanity game content is licensed under{' '}
                        <a
                            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-footer-text underline hover:text-white"
                        >
                            CC BY-NC-SA 4.0
                        </a>.
                        This open-source implementation is provided under the MIT License for educational and non-commercial use only.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
