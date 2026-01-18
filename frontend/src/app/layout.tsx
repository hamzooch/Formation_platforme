import "./globals.css";

export const metadata = {
  title: "DigitechPro",
  description: "Plateforme de formation en ligne moderne",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
