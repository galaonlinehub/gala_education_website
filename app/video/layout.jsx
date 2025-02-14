

export const metadata = {
    title: "Gala Education",
    description: "Gala Education",
    icons: {
        icon: [
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
        shortcut: [{ url: '/favicon.ico' }],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#d5d5c9]">
     
          
        {children}
        
      </body>
    </html>
  )
}
