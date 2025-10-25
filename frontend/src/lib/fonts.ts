import localFont from 'next/font/local';

export const ibmPlexSansArabic = localFont({
    src: [
        {
            path: '../../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Thin.otf',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-ExtraLight.otf',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Light.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Text.otf',
            weight: '450',
            style: 'normal',
        },
        {
            path: '../../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Medium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-SemiBold.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Bold.otf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-ibm-plex-arabic',
    display: 'swap',
});
