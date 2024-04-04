import withPWAInit from "next-pwa";
const withPWA = withPWAInit({
    dest: 'public'
})


export default withPWA({
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    }, experimental: {
        missingSuspenseWithCSRBailout: false,
    }
})