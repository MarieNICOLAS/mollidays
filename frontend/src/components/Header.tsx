import React from 'react';
import { Helmet } from 'react-helmet-async';

type HeaderProps = {
    title?: string;
    description?: string;
    keywords?: string;
    children?: React.ReactNode;
};

const defaultTitle = 'Mollidays - Votre plateforme de vacances';
const defaultDescription = 'Découvrez Mollidays, la plateforme idéale pour organiser vos vacances de rêve. Réservez, explorez et profitez !';
const defaultKeywords = 'vacances, réservation, voyages, mollidays, tourisme';

const Header: React.FC<HeaderProps> = ({
    title = defaultTitle,
    description = defaultDescription,
    keywords = defaultKeywords,
    children,
}) => (
    <>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
            <meta property="og:site_name" content="Mollidays" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
        <header>
            <nav aria-label="Navigation principale">
                <a href="/" aria-label="Accueil Mollidays">
                    <img src="/logo.svg" alt="Logo Mollidays" width={120} height={40} />
                </a>
                {children}
            </nav>
        </header>
    </>
);

export default Header;